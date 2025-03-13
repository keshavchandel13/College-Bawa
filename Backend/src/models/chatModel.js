const mongoose = require('mongoose');
const {Schema} = mongoose;

const chatSchema = new Schema({
    chatName:{
        type:String,
        trim:true,
    },
    isGroup:{
        type:Boolean,
        default:false,
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    lastMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    },
    groupAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    groupImage:{
        type:String,
    }
},
{timestamps:true}
);
const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;