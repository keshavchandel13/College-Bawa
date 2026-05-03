const express = require('express');
const router  = express.Router();
const protect = require('../middlewares/authMiddleware'); 
const {
  getAllCommunities, getTrending, createCommunity,
  joinCommunity, leaveCommunity, getMessages, postMessage,
} = require('../controllers/communityController');

router.get('/',                   getAllCommunities);
router.get('/trending',           getTrending);
router.post('/',    protect,      createCommunity);
router.post('/:id/join',  protect, joinCommunity);
router.post('/:id/leave', protect, leaveCommunity);
router.get('/:id/messages', protect, getMessages);
router.post('/:id/messages', protect, postMessage);

module.exports = router;