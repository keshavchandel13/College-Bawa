const mongoose = require('mongoose') // Imported mongoose
const dotenv = require('dotenv')
require('dotenv').config();

console.log("TEST_VAR:", process.env.TEST_VAR);
if(process.env.MONGO_URI){
    console.log("It exist")
} else{
    console.log("not")
}
console.log("MONGO_URI:", process.env.MONGO_URI); // Debug log


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