const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const {getItems, postItems} = require("../controllers/marketPlaceController")
router.get('/',authMiddleware, getItems);
router.post('/postItem',authMiddleware, postItems);

module.exports = router;