const MarketplaceItem = require('../models/MarketPlaceModel');
const uploadToCloudinary = require('../utils/uploadToCloudinary');

// Get marketplace items with pagination
const getItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const totalItems = await MarketplaceItem.countDocuments();

    const items = await MarketplaceItem.find()
      .populate("user", "name email profileImage")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      items,
    });
  } catch (err) {
    console.error("Error in getItems:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// Post a new item (with Cloudinary image upload)
const postItems = async (req, res) => {
  try {
 
    const { userId ,title, description, price, category, location } = req.body;



    if (!title || !price || !category) {
      return res.status(400).json({ message: "Title, price and category are required" });
    }

    // Upload all images to Cloudinary
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploads = req.files.map(file =>
        uploadToCloudinary(file.buffer, "marketplace")
      );
      imageUrls = await Promise.all(uploads);
    }


    const newItem = new MarketplaceItem({
       user:userId,
      title,
      description,
      price,
      category,
      location,
      images: imageUrls
    });

    const savedItem = await newItem.save();

    res.status(201).json({ message: "Item posted successfully", item: savedItem });
  } catch (err) {
    console.error("Error in postItems:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = { getItems, postItems };
