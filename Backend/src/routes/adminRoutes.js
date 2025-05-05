const express = require("express");
const { getDashboardStats, deleteUser } = require("../controllers/adminControllers");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/stats", authMiddleware, getDashboardStats);
router.delete("/users/:id", authMiddleware, deleteUser);

module.exports = router;
