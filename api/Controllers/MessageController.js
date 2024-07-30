import Chat from "../Models/ChatSchema.js";
import Message from "../Models/MessageSchema.js";
import User from "../Models/UserSchema.js";

export const getMessages = async (req, res) => {
    const { chatId } = req.params
    // console.log(chatId)
    try {
        const chat = await Chat.findById(chatId)
        const agentId = await chat.get("agentId")
        console.log("agentId: " + agentId)
        // console.log(chat)
        if (!chat || ![chat.userId.toString(), chat.agentId.toString()].includes(req.user.id.toString())) {
            return res.status(400).json({ error: 'Chat not found or unauthorized' });
        }

        const messages = await Message.find({ chat: chatId }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(error.status).json({ success: false, error: error.message });
    }
}

export const CreateMessage = async (req, res) => {

    const { chatId } = req.params;
    // console.log(chatId)
    const { content } = req.body;
    // console.log(content)
    try {
        const chat = await Chat.findById(chatId);

        const agentId = await chat.get("agentId")
        console.log("agentId: ", agentId)

        if (!chat) {
            res.status(404).json({ success: false, message: "Chat not found" })
        }

        // create message now
        const userId = req.user.id;

        const message = new Message({ chat: chatId, sender: userId, reciever: agentId, content ,seenBy:userId})

        const user = await User.findById(req.user.id).populate('userId', 'username email');

        user.messages.push(message);
        await user.save()

        await message.save()

        // Update the last message and unread count
          chat.lastMessage = message._id;

        await chat.save();

        res.status(200).json({ success: true, message: "Message saved successfully", message })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}