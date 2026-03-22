const express = require("express");
const multer = require("multer");
const { createPost, getPosts, likePost, commentOnPost, sharePost, getUserPost, deletePost, getComments } = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Multer configuration for image upload (in-memory storage for Cloudinary)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);  // Allow image files only
    } else {
      cb(new Error('Only image files are allowed!'), false);  // Reject non-image files
    }
  }
}).single("image");

// Route to create a post
router.post("/", authMiddleware, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      const errorMessage = err.code === 'LIMIT_FILE_SIZE' ? "File too large. Max 10MB allowed" : "File upload failed";
      return res.status(400).json({ message: errorMessage, error: err.message });
    }
    createPost(req, res);  // Forward to controller after file upload
  });
});

// Route to get all posts
router.get("/", authMiddleware, getPosts);

// Route to like a post
router.post("/:id/like", authMiddleware, likePost);

// Route to comment on a post
router.post("/:id/comment", authMiddleware, commentOnPost);

// Route to share a post
router.post("/:id/share", authMiddleware, sharePost);
// Get User post
router.get("/userpost/:userId", authMiddleware, getUserPost);
router.get("/:id/comment", authMiddleware, getComments);
// Delete post

router.delete("/posts/:id", authMiddleware, deletePost)

module.exports = router;
