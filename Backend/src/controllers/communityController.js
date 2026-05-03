const mongoose = require('mongoose');
const Community = require('../models/Community');
const { getIO } = require('../sockets/socketHandler');
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const COMMUNITY_FIELDS = 'name description avatar createdBy members tags isPublic createdAt';

// GET /api/community?query=&page=1&limit=12
const getAllCommunities = async (req, res) => {
  const { query = '', page = '1', limit = '12' } = req.query;
  const pageNum  = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
  const skip     = (pageNum - 1) * limitNum;

  const filter = query.trim()
    ? { $text: { $search: query.trim() } }
    : {};

  try {
    const [communities, total] = await Promise.all([
      Community.find(filter)
        .select(COMMUNITY_FIELDS)
        .skip(skip)
        .limit(limitNum)
        .sort({ createdAt: -1 })
        .lean(),
      Community.countDocuments(filter),
    ]);

    const result = communities.map((c) => ({ ...c, memberCount: c.members.length }));
    res.status(200).json({ communities: result, total, page: pageNum });
  } catch (err) {
    console.error('[getAllCommunities]', err.message);
    res.status(500).json({ error: 'Failed to fetch communities' });
  }
};

// GET /api/community/trending  (top 5 by member count)
const getTrending = async (req, res) => {
  try {
    const communities = await Community.aggregate([
      { $project: { name: 1, memberCount: { $size: '$members' } } },
      { $sort: { memberCount: -1 } },
      { $limit: 5 },
    ]);
    res.status(200).json(communities);
  } catch (err) {
    console.error('[getTrending]', err.message);
    res.status(500).json({ error: 'Failed to fetch trending' });
  }
};

// POST /api/community
const createCommunity = async (req, res) => {
  const { name, description, tags, isPublic } = req.body;
  const createdBy = req.user.userId; 

  if (!name?.trim()) return res.status(400).json({ error: 'Community name is required' });

  try {
    const exists = await Community.findOne({ name: name.trim() }).lean();
    if (exists) return res.status(409).json({ error: 'Community name already taken' });

    const community = await Community.create({
      name:   name.trim(),
      description: description?.trim() || '',
      tags:   Array.isArray(tags) ? tags.slice(0, 5) : [],
      isPublic: isPublic !== false,
      createdBy,
      members: [createdBy], // creator auto-joins
    });

    res.status(201).json(community);
  } catch (err) {
    console.error('[createCommunity]', err.message);
    res.status(500).json({ error: 'Failed to create community' });
  }
};

// POST /api/community/:id/join
const joinCommunity = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  if (!isValidId(id)) return res.status(400).json({ error: 'Invalid community ID' });

  try {
    const community = await Community.findByIdAndUpdate(
      id,
      { $addToSet: { members: userId } },
      { new: true }
    ).select(COMMUNITY_FIELDS).lean();

    if (!community) return res.status(404).json({ error: 'Community not found' });
    res.status(200).json({ ...community, memberCount: community.members.length });
  } catch (err) {
    console.error('[joinCommunity]', err.message);
    res.status(500).json({ error: 'Failed to join community' });
  }
};

// POST /api/community/:id/leave
const leaveCommunity = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  if (!isValidId(id)) return res.status(400).json({ error: 'Invalid community ID' });

  try {
    const community = await Community.findByIdAndUpdate(
      id,
      { $pull: { members: userId } },
      { new: true }
    ).select(COMMUNITY_FIELDS).lean();

    if (!community) return res.status(404).json({ error: 'Community not found' });
    res.status(200).json({ ...community, memberCount: community.members.length });
  } catch (err) {
    console.error('[leaveCommunity]', err.message);
    res.status(500).json({ error: 'Failed to leave community' });
  }
};

// GET /api/community/:id/messages?limit=50
const getMessages = async (req, res) => {
  const { id } = req.params;
  const limit  = Math.min(100, parseInt(req.query.limit, 10) || 50);

  if (!isValidId(id)) return res.status(400).json({ error: 'Invalid community ID' });

  try {
    const community = await Community.findById(id)
      .select('messages members')
      .populate('messages.sender', 'name profileImage')
      .lean();

    if (!community) return res.status(404).json({ error: 'Community not found' });

    const isMember = community.members.some((m) => m.toString() === req.user.userId.toString());
    if (!isMember) return res.status(403).json({ error: 'Join the community to read messages' });

    const messages = community.messages.slice(-limit);
    res.status(200).json(messages);
  } catch (err) {
    console.error('[getMessages]', err.message);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// POST /api/community/:id/messages
const postMessage = async (req, res) => {
  const { id }     = req.params;
  const { content } = req.body;
  const senderId   = req.user.userId;

  if (!isValidId(id))         return res.status(400).json({ error: 'Invalid community ID' });
  if (!content?.trim())       return res.status(400).json({ error: 'Message cannot be empty' });
  if (content.length > 2000)  return res.status(400).json({ error: 'Message too long' });

  try {
    const community = await Community.findById(id).select('members messages');
    if (!community) return res.status(404).json({ error: 'Community not found' });

    const isMember = community.members.some((m) => m.toString() === senderId.toString());
    if (!isMember) return res.status(403).json({ error: 'Join the community to send messages' });

    const newMessage = { sender: senderId, content: content.trim() };
    community.messages.push(newMessage);
    await community.save();

    const savedMsg = community.messages[community.messages.length - 1];
    await community.populate('messages.sender', 'name profileImage');
    const populated = community.messages.id(savedMsg._id);

    res.status(201).json(populated);
  } catch (err) {
    console.error('[postMessage]', err.message);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

module.exports = { getAllCommunities, getTrending, createCommunity, joinCommunity, leaveCommunity, getMessages, postMessage };