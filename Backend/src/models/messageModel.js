const mongoose = require('mongoose');
const {Schema} = mongoose;

const messageSchema = new Schema({
    sender:{ // Sender Info
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    content:{ // Message Content
        type:String,
        required:true,
    },
    chat:{ // Chat info from chat model
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chat',
        required:true,
    },
    readBy:[{ // Users who read the message
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',

    }],
    attachment:{ // Attachment info connoected to cloudinary
        url: {type:String},
        type: {type:String},
    }
},
{timestamps:true}
);
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;