const MarketplaceItem = require('../models/MarketPlaceModel');

// Get marketplace items with pagination
const getItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const totalItems = await MarketplaceItem.countDocuments();

    const items = await MarketplaceItem.find()
      .populate({
        path: 'user',
        select: 'name email profileImage'
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      items
    });
  } catch (err) {
    console.error("Error in getItems:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Post a new item to marketplace
const postItems = async (req, res) => {
  try {
    const { title, description, price, category, location, images } = req.body;
    const user = req.user._id; // Assuming authMiddleware sets req.user

    if (!title || !price || !category) {
      return res.status(400).json({ message: "Title, price and category are required" });
    }

    const newItem = new MarketplaceItem({
      user,
      title,
      description,
      price,
      category,
      location,
      images
    });

    const savedItem = await newItem.save();

    res.status(201).json({ message: "Item posted successfully", item: savedItem });
  } catch (err) {
    console.error("Error in postItems:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = { getItems, postItems };