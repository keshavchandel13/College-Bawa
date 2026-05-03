const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, trim: true, maxlength: 2000 },
  },
  { timestamps: true }
);

const communitySchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true, unique: true, maxlength: 80 },
    description: { type: String, trim: true, maxlength: 500, default: '' },
    avatar:      { type: String, default: '' },
    createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages:    [messageSchema],
    tags:        [{ type: String, trim: true }],
    isPublic:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Virtual member count
communitySchema.virtual('memberCount').get(function () {
  return this.members.length;
});

// Text index for search
communitySchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Community', communitySchema);