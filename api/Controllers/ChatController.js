import Agent from "../Models/AgentSchema.js";
import User from "../Models/UserSchema.js";
import Chat from "../Models/ChatSchema.js";
import Message from "../Models/MessageSchema.js";

export const NewChats = async (req, res) => {
    const { agentId } = req.body;
    try {
        const userId = req.user.id
        // const agentId = req.params.id
        console.log("userId: " + userId + " agentId: " + agentId)

        if (!agentId) {
            return res.status(400).json({ error: 'Agent ID is required' });
        }

        const agent = await Agent.findById(agentId);
        const user = await User.findById(req.user.id);

        const chat = new Chat({ userId: userId, agentId: agentId });
        // add chat to user   
        user.chats.push(chat._id)
        await user.save()
        // add chat to agent
        agent.chats.push(chat._id);
        await agent.save();

        await chat.save();
        res.status(201).json({ message: "Successfully chat ", chat });
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }

}

export const AllChats = async (req, res) => {
    try {
        const userId = req.user.id
        const chats = await Chat.find({
            $or: [{ userId: userId }, { agentId: req.user.id }]
        }).populate('userId', 'username email avatar')
            .populate('agentId', 'username email avatar')
            .populate('lastMessage', 'content').populate('Message' , 'content userRole createdAt')
            ;
        console.log("chats", chats)
        res.status(200).json(chats);
    } catch (error) {
        res.status(402).json({ success: false, message: error.message });
    }
}

export const getChat = async (req, res) => {
    const { chatId } = req.params;
const userId = req.user.id
    try {
        
        const chat = await Chat.findById(chatId).populate('userId', 'username email').populate('agentId', 'username email').populate('lastMessage', 'content').populate('seenBy', 'username');

        if (!chat) {
           
            return res.status(404).json({ success: false, message: "Chat not found" });
        }
        const agentId = chat.agentId;
        console.log("agentId: ", agentId);
        const { seenBy } = chat;
        console.log("seenBy: ", seenBy);
        
        res.status(200).json({ success: true, message: "Chat retrieved successfully", chat });

    } catch (error) {
        
        console.error("Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}