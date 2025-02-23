const mongoose = require('mongoose') // Imported mongoose
const dotenv = require('dotenv') // Imported dotenv for .env
dotenv.config()

// Establishing connection with mongodb atlas
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDb connected");
    } catch(error){
        console.log("MongoDb connection error: ",error);
        process.exit(1);
    }
};
module.exports = connectDB