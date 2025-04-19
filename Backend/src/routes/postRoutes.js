const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createPost,
  getPosts,
  likePost,
  commentOnPost,
  sharePost
} = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the uploads folder exists
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Use timestamp + file extension as filename
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File size limit: 10MB
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit size to 10MB
}).single("image");  // Field name should match with what is sent from client

// Routes
router.post("/", authMiddleware, (req, res) => {
  upload(req, res, (err) => {
    console.log("🖼️ req.file:", req.file);
    console.log("I am here un route")
    console.log(req.body)
    if (err) {
      // Handle file upload errors
      return res.status(400).json({ message: "File upload failed", error: err.message });
    }
    
    // Proceed with creating the post
    createPost(req, res);
  });
});
router.get("/", getPosts);
router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, commentOnPost);
router.post("/:id/share", authMiddleware, sharePost);

module.exports = router;
