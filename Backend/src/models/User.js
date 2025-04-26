const mongoose = require('mongoose')
const { Schema } = mongoose;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        }
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: { type: String },
    additionalDetails: {
        name: { type: String },
        age: { type: Number },
        gender: { type: String },
        school: { type: String },
        address: { type: String },
        college: { type: String },
        branch: { type: String },
        skills:{type:String},
        bio:{type:String}

    },
    googleId: { type: String },
    resetToken: { type: String },
    profileImage: { type: String },
}, 
{timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;