import mongoose from "mongoose";
mongoose.set('strictPopulate', false);
const ChatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    agentId: {
        type: mongoose.Types.ObjectId,
        ref:"Agent",
        required:true,
    },
    seenBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ],    
      Message: [{
        type: mongoose.Types.ObjectId,
        ref: 'Message'
      }],
      lastMessage: {
        type: mongoose.Types.ObjectId,
        ref: 'Message'
      },
    
},{timestamps:true})


const Chat = mongoose.model('Chat',ChatSchema)

export default Chat;