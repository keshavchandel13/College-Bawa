const express = require("express");
const { getDashboardStats, deleteUser } = require("../controllers/adminControllers");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/stats", verifyToken, getDashboardStats);
router.delete("/users/:id", verifyToken, deleteUser);

module.exports = router;
