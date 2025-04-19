const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  createPost,
  getPosts,
  likePost,
  commentOnPost,
  sharePost
} = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// 🔧 Ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 📦 Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// ⛔ 10MB file limit, single "image" field
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
}).single("image");

// ✅ Route for creating post
router.post("/", authMiddleware, (req, res, next) => {
  // Run multer first
  upload(req, res, function (err) {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({ message: "File upload failed", error: err.message });
    }

    console.log("🖼️ Uploaded file:", req.file);
    console.log("📝 Post content:", req.body);

    // ✅ Forward to controller
    createPost(req, res);
  });
});

// ✅ Route to get all posts
router.get("/", getPosts);

// ✅ Like a post
router.post("/:id/like", authMiddleware, likePost);

// ✅ Comment on a post
router.post("/:id/comment", authMiddleware, commentOnPost);

// ✅ Share a post
router.post("/:id/share", authMiddleware, sharePost);

module.exports = router;
