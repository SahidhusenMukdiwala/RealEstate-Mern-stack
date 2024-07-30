import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reciever:{ type: mongoose.Types.ObjectId,ref:'Agent', required: true },
  content: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  seenBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }],
    lastActive: { type: Date, default: Date.now },
},{timestamps:true})

const Message = mongoose.model('Message',MessageSchema);
export default Message;


// model Message {
//   id         String             @id default(auto()) @Map("_id") @db.ObjectId
//   text       String 
//   userId     String
//   chat       Chat               @relation(fields:[chatId],reference:[id])
//   Chat       String             @db.ObjectId
//   createdAt  DateTime           @default(now()) 
// }

// model Chat {
//   id         String             @id default(auto()) @Map("_id") @db.ObjectId
//   users      User[]             @relation(fields:[userId],reference:[id])
//   userIds     String[]           @db.ObjectId
//   createdAt  DateTime           @default(now()) 
// seenBy       String[]            @db.ObjectId
// }