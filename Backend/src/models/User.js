const mongoose = require('mongoose')
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
        required:true
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