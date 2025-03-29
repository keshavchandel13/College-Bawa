const multer = require("multer");
const path = require("path")

//Storage configuration
const storage = multer.diskStorage({
    destination: (req, file ,cb) =>{
        cb(null, "uploads/");
    },
    filename:(req,res,cb)=>{
        cb(null, `${Date.now()}${path.extname(file.orignalname)}`);
    }
});

//File filter
const fileFilter = (req,res,cb)=>{
    if(file.mimetype.startsWith("image/")){
        cb(null, true);
    } else{
        cb(new Error("Only images are allowed!"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 5*1024*1024},
})

module.exports = upload
