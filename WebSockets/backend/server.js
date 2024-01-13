import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors'
import { Server } from 'socket.io'
const app = express();

app.use(cors())

const server = createServer(app);

const socketIO = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    }
})

socketIO.on('connection', (socket) => {
    
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('chat', (chatDetails, roomId) => {
        if(roomId === '') {
          socket.broadcast.emit('chat-rcvd', chatDetails)
        }
        else {
          console.log("room id: ",roomId)
          socket.to(roomId).emit('chat-rcvd', chatDetails)
        }
    })

    socket.on('join-room', (roomId) => {
        socket.join(roomId)
    })

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});