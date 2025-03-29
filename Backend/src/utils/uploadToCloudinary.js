const cloudinary = require('../config/cloudinary')

const uploadToCloudinary = async (filePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder,
            resource_type: "auto",
        });
        return result;
    } catch(error) {
        console.error("Cloudinary Upload Error:", error.message);
        throw error;
    }
};

module.exports = uploadToCloudinary;