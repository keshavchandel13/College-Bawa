const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploader');
const { getItems, postItems } = require('../controllers/marketPlaceController');

router.get('/', authMiddleware, getItems);
router.post('/postItem', authMiddleware, upload.array("images", 5), postItems);

module.exports = router;
