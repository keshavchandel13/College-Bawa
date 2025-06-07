const MarketPlaceItem = require('../models/MarketPlaceModel')
// To get the Items which are posted for selling
const getItems = async(req, res) =>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page-1)*limit;
        // Total number of document
        const totalItems = await  MarketPlaceItem.countDocuments();
        // fetching items
        const items = await MarketPlaceItem.find().
        populate({
            path:'user',
            select: 'name email profileImage'
        })
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit);

        res.status(200).json({
            currentPage:page,
            totalPages: Math.ceil(totalItems/limit),
            totalItems,
            items
        });
    }
    catch(err){
        console.log("Error In MarketPlace: ",err);
    }

}
// Post Items to Sell
const postItems = async(req, res) =>{

}

module.exports = {getItems, postItems};
