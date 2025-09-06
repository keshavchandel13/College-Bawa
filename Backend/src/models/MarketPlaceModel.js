const mongoose = require('mongoose');

const MarketPlaceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  category: { 
    type: String,
    required: true,
    enum: ["project", "books", "gadget"]
  },
  location: {
    type: String 
  },
  status: {
    type: String,
    enum: ['sold', 'Available'],
    default: 'Available'
  },
  images: [{
    type: String 
  }],
  postedOn: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true 
});

const MarketplaceItem = mongoose.model('MarketplaceItem', MarketPlaceSchema);
module.exports = MarketplaceItem;