import React, {  useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './Chat.css';
import { format } from 'timeago.js';

function Chat() {
    const { currentUser } = useSelector(state => state.user);
    const [agentId, setAgentId] = useState('')
    const [chat, setChat] = useState([]);
    const [messages, setMessages] = useState([]);
    const userId = currentUser?.data?._id;
    const userRole1 = currentUser?.data?.role;
    const [allchats, setAllchats] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    console.log("selectedChatId", selectedChatId)
    const [messageContent, setMessageContent] = useState('');
    console.log(allchats);
    const [signleData, setSingleData] = useState([]);
    const messageEndRef = useRef()

    useEffect(()=>{
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    },[messages])



    const handleStartChat = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/chat/chats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId, agentId: agentId })
            });
            const result = await res.json();

            if (!res.ok) {
                toast.error("There was an error fetching the chat.");
            }
            setChat(result);
        } catch (error) {
            console.error('Error starting chat', error);
        }
    };

    useEffect(() => {
        const handleAllchats = async () => {
            try {
                const res = await fetch(`/api/chat/chats/Allchats`);
                // const res = await fetch(`/message/messages/${ChatId}/getmessages`)
                const data = await res.json();

                if (!res.ok) {
                    toast.error("There was an error fetching all chats.");
                }
                setAllchats(data);
            } catch (error) {
                console.log(error);
            }
        };
        handleAllchats();
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setAgentId(e.target.value);
    };
    const handleChangeMessageInput = (e) => {
        setMessageContent(e.target.value);
    };

    const HandleCreateMessage = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/message/messages/${selectedChatId}/CreateMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: messageContent })
            });
            const result = await res.json();
            console.log(result)
            if (!res.ok) {
                toast.error("There was an error sending the message.");
            }
            setMessageContent('');
            setMessages([...messages, result]);
            toast.success("Message sent successfully!");
        } catch (error) {
            console.log('Error sending message', error);
        }
    }


    const handleOpenChat = async (ChatId, agent) => {
        try {
            setSelectedChatId(ChatId);
            const res = await fetch(`/message/messages/${ChatId}/getmessages`);
            const result = await res.json();

            if (!res.ok) {
                console.log(res.message);
            }
            setSingleData({ ...result, agent });
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className='chat flex flex-col w-80 sm:w-[500px] m-auto justify-center p-3 bg-gray-700'>

            {currentUser?.data?.role === 'user' && (
                <>
                    <div>
                        <h1 className='text-2xl text-white text-center'>Search Agent</h1>
                    </div>
                    <div className='flex gap-2 items-center justify-center mt-4 text-black'>
                        <input className='max-w-48 p-3'
                            type="text"
                            value={agentId}
                            onChange={handleChange}
                            placeholder="Enter Agent ID"
                        />
                        <button onClick={handleStartChat} className='bg-white text-black p-3 rounded-lg'>Start Chat</button>
                    </div>
                </>
            )}

            {allchats.length === 0 ? "NO CHAT YET" : (
                <div>
                    <h1 className="text-center text-xl">Chat started </h1>
                    {allchats.map((chat) => {
                        const user = chat?.userId?._id;
                        const ChatId = chat._id;
                        const userData = chat.userId;
                        const lastMessage = chat?.lastMessage?.content;
                        console.log("lastMessage",lastMessage)
                        const agent = chat?.agentId?._id;
                        const agentData = chat.agentId;
                        const Message = chat?.Message;
                        console.log(Message)

                        return (
                            <div key={chat._id}>
                                <div className="chat cursor-pointer w-full" onClick={() => handleOpenChat(ChatId, agent)}>
                                    {userId === user && (
                                        <div className="user-details flex flex-wrap items-center justify-evenly rounded-lg hover:scale-[0.9] hover:overflow-hidden duration-[1s] mt-3 text-white sm:p-3"
                                            style={{ backgroundColor: chat.seenBy.includes(userId) ? "white" : "#fecd514e", color: chat.seenBy.includes(userId) ? "black" : "#fff" }}>
                                            <img className='w-[40px] h-[40px] rounded-full' src={agentData.avatar} alt={`${agentData.username}'s avatar`} />
                                            <p>{agentData.username}</p>
                                            <p>{lastMessage}</p>
                                        </div>
                                    )}
                                    {userId === agent && (
                                        <div className="w-full agent-details flex items-center justify-evenly rounded-lg hover:scale-[0.9] hover:overflow-hidden duration-[1s] mt-3 text-white gap-3 sm:p-3"
                                            style={{ backgroundColor: chat.seenBy.includes(userId) ? "white" : "#fecd514e", color: chat.seenBy.includes(userId) ? "black" : "#fff" }}>
                                            <img className='w-[40px] h-[40px] rounded-full' src={userData.avatar} alt={`${userData.username}'s avatar`} />
                                            <p>{userData.username}</p>
                                            <p>{lastMessage}</p>
                                        </div>
                                    )}
                                </div>

                                {selectedChatId === chat._id && (
                                    <div className="ChatBox mt-3 bg-white p-3 text-black">
                                        <div className="top">
                                            <div className="">
                                                {user === userId ? <div className="user bg-yellow-400 p-2 flex items-center justify-around">
                                                    <img className='w-[40px] h-[40px] rounded-full' src={agentData.avatar} alt={`${agentData.username}'s avatar`} />
                                                    <p>{agentData.username}</p>
                                                    <div className="close cursor-pointer" onClick={() => setSelectedChatId(null)}>X</div>
                                                </div> : <div className="user bg-yellow-400 p-2 flex items-center justify-around">
                                                    <img className='w-[40px] h-[40px] rounded-full' src={userData.avatar} alt={`${userData.username}'s avatar`} />
                                                    <p>{userData.username}</p>
                                                    <div className="close cursor-pointer" onClick={() => setSelectedChatId(null)}>X</div>
                                                </div>

                                                }
        
                                            </div>
                                        </div>
                                        <div className="center border p-2 mt-3 h-[350px] overflow-scroll flex flex-col">
                                            {Message.map((message) => (
                                                <div key={message._id} className="chatMessages" style={{
                                                    alignSelf: message.userRole === "agent" ? 'flex-start' : 'flex-end',
                                                    textAlign: message.userRole === 'agent' ? 'left' : 'right'
                                                }}>
                                                    <p className='text-[20px]'>{message.content}</p>
                                                    <span className='bg-yellow-400 text-white p-1 text-[12px] rounded-lg'>
                                                        {format(message.createdAt)}
                                                    </span>
                                                </div>
                                            ))}
                                            <div className="" ref={messageEndRef}></div>
                                        </div>
                                        <form onSubmit={HandleCreateMessage} className="button flex justify-center flex-wrap items-center mt-2">
                                            <textarea name="content"
                                                id="content"
                                                onChange={handleChangeMessageInput}
                                                value={messageContent} className='border font-serif border-yellow-400 text-md rounded-lg focus:outline-none flex-1 pl-4 pt-2'></textarea>
                                            <button className='bg-yellow-400 p-3 rounded-lg h-full'>Send</button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default Chat;
