const Post = require("../models/Post");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    
    let image = null;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const post = new Post({ user: req.user.id, content, image });
    await post.save();

    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all posts with user details
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name profileImage")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Like or unlike a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter(userId => userId.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();
    res.json({ message: "Like updated", likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Comment on a post
exports.commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ user: req.user.id, text });
    await post.save();

    res.json({ message: "Comment added", comments: post.comments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Share a post (Increment share count)
exports.sharePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.shares += 1;
    await post.save();

    res.json({ message: "Post shared", shares: post.shares });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
