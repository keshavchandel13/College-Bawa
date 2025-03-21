const express = require("express");
const { createPost, getPosts, likePost, commentOnPost, sharePost } = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, commentOnPost);
router.post("/:id/share", authMiddleware, sharePost);

module.exports = router;
