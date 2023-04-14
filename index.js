const express = require('express');
const mongoose = require('mongoose')
// const appRoute = require('./route');
const appRoute = require('./routes/index');
const dotenv = require('dotenv');
const cors =require('cors')
const socket = require('socket.io');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('URLMONGOOSE');
})


app.use('/api',appRoute);

// app.use('/',(req,res) =>{
//     console.log('hello');
// })
const server = app.listen(8000);

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

global.onlineUsers = new Map();

io.on('connection',(socket) =>{
    global.chatSocket = socket;
    socket.on('add-user',(userId) =>{
        onlineUsers.set(userId,socket.id)
    });

    socket.on('send-msg',(data) =>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.msg)
        }
    })
})
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });
