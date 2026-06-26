const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Create the Express app and the HTTP server
const app = express();
const server = http.createServer(app);

// Attach Socket.io to the server
const io = new Server(server, {
  cors: { origin: '*' } // Allow our React Native app to connect
});

// This is our simple in-memory Database (Filing Cabinet)
const messageDatabase = [];

// Listen for connections from the app
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // 1. Give the new user all the old messages immediately!
  socket.emit('load_history', messageDatabase);

  // When a user sends a message, receive it here
  socket.on('send_message', (data) => {
    console.log('Message received on server:', data);
    
    // 2. Put the message inside the Filing Cabinet!
    messageDatabase.push(data);
    
    // 3. Broadcast the message to EVERYONE connected
    io.emit('receive_message', data);
  });

  // Listen for disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
