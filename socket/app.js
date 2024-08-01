import {Server} from 'socket.io'


const io = new Server({
    cors: {
     origin:'http://localhost:5173',
    }
});

let onlineUser = []

const addUser =(userId,socketId) =>{
const userExist = onlineUser.find(user => user.userId === userId)
if(!userExist){
    onlineUser.push({userId,socketId})
}
}

const removeUser =(socketId) =>{
onlineUser = onlineUser.filter((user) => user.socketId !== socketId)
}


const getuser = (userId) =>{
    return onlineUser.find((user) => user.userId === userId)
}



io.on('connection',(socket) =>{
    // console.log("socket",socket.id)
    socket.on("newUser",(userId)=>{
        addUser(userId,socket.id)
    });
    socket.on('disconnect',()=>{
removeUser(socket.id);
    });
    socket.on('sendMessage',({receiverId,data})=>{
        const receiver = getuser({receiverId})
        io.to(receiver.socketId).emit('getMessage',data)
        // console.log(data)
    })
});


io.listen('4000')