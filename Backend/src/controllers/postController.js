const Post = require("../models/Post");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    console.log("Uploaded File:", req.file);
    const { content } = req.body;

    // Validate content before creating post
    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Content is required" });
    }

    // Handle image file (if exists)
    let image = null;
    if (req.file) {
      try {
        // Upload to Cloudinary in user_post folder
        const result = await uploadToCloudinary(req.file.buffer, "user_post");
        image = result;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ 
          message: "Image upload failed",
          error: uploadError.message 
        });
      }
    }

    // Create the new post
    console.log(req.user.userId, content, image)
    const post = new Post({ 
      user: req.user.userId, 
      content, 
      image 
    });

    // Save the post to the database
    await post.save();

    // Respond with the created post data
    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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

    const userId = req.user.userId;

    const alreadyLiked = post.likes.some(
      id => id.toString() === userId
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        id => id.toString() !== userId
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      message: "Like updated",
      likes: post.likes.length
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
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

exports.getUserPost = async (req, res) => {
  try {
    const { userId } = req.params;
 
    const userPost = await Post.find({ user: userId })
      .populate("user", "name profileImage")
      .sort({ createdAt: -1 });
    res.status(200).json({ message: "User posts", userPost });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params; 
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check ownership 
    if (post.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }


    if (post.image && post.image.public_id) {
      const cloudinary = require("cloudinary").v2;
      try {
        await cloudinary.uploader.destroy(post.image.public_id);
      } catch (err) {
        console.warn("Cloudinary image delete failed:", err.message);
      }
    }

    // Delete post from DB
    await Post.findByIdAndDelete(id);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};