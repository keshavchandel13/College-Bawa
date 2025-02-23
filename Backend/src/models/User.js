const mongoose = require('mongoose')
const userSchema = new Schema({
    name:{ // Name of the user
      type: string,
      required: true  
    }, 
    email:{ // Email of the user
        type: string,
        unique:true,
        required: true
    },
    password:{ // Hashed Password
        type:string,
        required:true
    },
    googleId:{ // Google Id
        type:string
    },
    resetToken:{ // Reset token 
        type:string
    },

});
const User = mongoose.model("User", userSchema);
module.exports = User;