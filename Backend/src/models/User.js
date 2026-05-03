const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name:     { type: String, required: true },
    email:    { type: String, unique: true, required: true },
    password: {
      type: String,
      required: function () { return !this.googleId; },
    },
    isVerified:        { type: Boolean, default: false },
    verificationToken: { type: String },
    googleId:          { type: String },
    resetToken:        { type: String },
    profileImage:      { type: String },
    isOnline:          { type: Boolean, default: false },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    communities: [{ type: Schema.Types.ObjectId, ref: 'Community' }],

    additionalDetails: {
      name:    { type: String },
      age:     { type: Number },
      gender:  { type: String },
      school:  { type: String },
      address: { type: String },
      college: { type: String },
      branch:  { type: String },
      skills:  [{ type: String }],  
      bio:     { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);