const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');

const SELECTED_FIELDS =
  'name email profileImage isOnline friends communities additionalDetails createdAt';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const escapeRegex = (t = '') =>
  typeof t === 'string'
    ? t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    : '';

// GET /api/user/stats/:id
const getUserStats = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.status(400).json({ error: 'Invalid user ID' });

  const oid = new mongoose.Types.ObjectId(id);

  try {
    const [stats] = await User.aggregate([
      { $match: { _id: oid } },

      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'user',
          as: 'userPosts',
        },
      },

      {
        $lookup: {
          from: 'communities',
          localField: 'communities',
          foreignField: '_id',
          as: 'joinedCommunities',
        },
      },

      {
        $addFields: {
          postCount: { $size: { $ifNull: ['$userPosts', []] } },

          totalLikes: {
            $sum: {
              $map: {
                input: { $ifNull: ['$userPosts', []] },
                as: 'post',
                in: { $size: { $ifNull: ['$$post.likes', []] } },
              },
            },
          },

          totalComments: {
            $sum: {
              $map: {
                input: { $ifNull: ['$userPosts', []] },
                as: 'post',
                in: { $size: { $ifNull: ['$$post.comments', []] } },
              },
            },
          },

          friendCount: {
            $size: { $ifNull: ['$friends', []] },
          },

          communityCount: {
            $size: { $ifNull: ['$communities', []] },
          },

          memberSince: {
            $dateDiff: {
              startDate: '$createdAt',
              endDate: '$$NOW',
              unit: 'month',
            },
          },
        },
      },

      {
        $project: {
          postCount: 1,
          totalLikes: 1,
          totalComments: 1,
          friendCount: 1,
          communityCount: 1,
          memberSince: 1,
        },
      },
    ]);

    if (!stats)
      return res.status(404).json({ error: 'User not found' });

    res.status(200).json(stats);
  } catch (err) {
    console.error('[getUserStats]', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

//  GET /api/user/all-users 
const getAllUsers = async (req, res) => {
  let { query = '', currentUserId, page = '1', limit = '20' } = req.query;

  if (!currentUserId || !isValidObjectId(currentUserId))
    return res
      .status(400)
      .json({ error: 'Invalid or missing currentUserId' });

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 20));
  const skip = (pageNum - 1) * limitNum;

  const safeQuery = typeof query === 'string' ? query.trim() : '';

  const exclusion = {
    _id: { $ne: new mongoose.Types.ObjectId(currentUserId) },
  };

  const searchFilter = safeQuery
    ? {
        $and: [
          exclusion,
          {
            $or: [
              {
                name: {
                  $regex: escapeRegex(safeQuery),
                  $options: 'i',
                },
              },
              {
                email: {
                  $regex: escapeRegex(safeQuery),
                  $options: 'i',
                },
              },
            ],
          },
        ],
      }
    : exclusion;

  try {
    const [users, total] = await Promise.all([
      User.find(searchFilter)
        .select(SELECTED_FIELDS)
        .skip(skip)
        .limit(limitNum)
        .lean(),

      User.countDocuments(searchFilter),
    ]);

    res.status(200).json({
      users: users || [],
      total: total || 0,
      page: pageNum,
    });
  } catch (err) {
    console.error('[getAllUsers]', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// GET /api/user/user/:id 
const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.status(400).json({ error: 'Invalid user ID' });

  try {
    const user = await User.findById(id)
      .select(SELECTED_FIELDS)
      .lean();

    if (!user)
      return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error('[getUserById]', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// PUT /api/user/update/:id 
const updateUserProfile = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.status(400).json({ error: 'Invalid user ID' });

  try {
    const updateData =
      typeof req.body.additionalDetails === 'object' &&
      req.body.additionalDetails !== null
        ? req.body.additionalDetails
        : {};

    const user = await User.findByIdAndUpdate(
      id,
      { $set: { additionalDetails: updateData } },
      { new: true, runValidators: true }
    )
      .select(SELECTED_FIELDS)
      .lean();

    if (!user)
      return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error('[updateUserProfile]', err);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserProfile,
  getUserStats,
};