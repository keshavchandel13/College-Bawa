const User = require('../models/User');
const Post = require('../models/Post');

const search = async(req,res) =>{
    const query = req.query.q;
    if(!query || query.trim() === ""){
        return res.status(400).json({error:`query doesn't exist`});
    }
    
}


module.exports = {search}