import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const http = createServer(app);
const io = new Server(http);

app.get('/', (req, res) => {
    res.sendFile('public/doodle.html', { root: '.' })
});

io.on('connection', (socket) => {
    socket.on('draw', (data) => {
        socket.broadcast.emit('draw', data);
    });
    socket.on('clear', () => {
        socket.broadcast.emit('clear');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
