import Agent from "../Models/AgentSchema.js";
import User from "../Models/UserSchema.js";
import Chat from "../Models/ChatSchema.js";

export const NewChats = async (req, res) => {
    try {
        const userId = req.user.id
        const agentId = req.params.id
        console.log("userId: " + userId + " agentId: " + agentId)

        if (!agentId) {
            return res.status(400).json({ error: 'Agent ID is required' });
        }

        const agent = await Agent.findById(req.params.id);
        const user = await User.findById(req.user.id);

        const chat = new Chat({ userId: userId, agentId: agentId });
        // add chat to user   
        user.chats.push(chat._id)
        await user.save()
        // add chat to agent
        agent.chats.push(chat._id);
        await agent.save();

        await chat.save();
        res.status(201).json({message:"Successfully chat ",chat});
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }

}

export const AllChats = async (req, res) => {
    try {
        const userId = req.user.id
        const chats = await Chat.find({
            $or: [{ userId: userId }, { agentId: req.user.id }]
        }) .populate('userId', 'username email avatar') 
        .populate('agentId', 'username email avatar') 
        .populate('lastMessage');
        console.log("chats",chats)
        res.status(200).json(chats);
    } catch (error) {
        res.status(402).json({ success: false, message: error.message });
    }
}