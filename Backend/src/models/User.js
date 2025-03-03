const mongoose = require('mongoose')
const { Schema } = mongoose; 
const userSchema = new Schema({
    name:{ // Name of the user
      type: String,
      required: true  
    }, 
    email:{ // Email of the user
        type: String,
        unique:true,
        required: true
    },
    password:{ // Hashed Password
        type:String,
        required: function() {
            return !this.googleId;  // Password required only if NOT using Google Auth
        }
    },
    isVerified: { 
        type: Boolean,
        default: false,
        //required: ===================Needs Implementation!!!!!!: Not required for Google Login
    },
    verificationToken: {    // For email verification
        type: String 
    }, 
    additionalDetails: {    //User Profile credentials
        name: { type: String },
        age: { type: Number },
        gender: { type: String },
        school: { type: String },
        address: { type: String },
        college: { type: String },
        branch: { type: String }
        
    },
    googleId:{ // Google Id
        type:String
    },
    resetToken:{ // Reset token 
        type:String
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;