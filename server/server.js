const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors")

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Your React app's URL
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  
  socket.on("message", (msg) => {
    console.log("Message from client:", msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => console.log("User disconnected"));
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});