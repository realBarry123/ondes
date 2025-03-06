const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors")

const app = express();
const server = http.createServer(app);

var rooms = [];

// Enable CORS
app.use(cors());

const generateId = () => {
  return Math.random().toString(36).substring(2, 6);
}

const randInstrument = () => {
  return "lith";
  instruments = ["phon", "lung", "lith"];
  return instruments[Math.floor(Math.random() * instruments.length)];
}

const io = new Server(server, {
    cors: {
        origin: "*", // Your React app's URL
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  
  socket.on("message", (msg) => {
    console.log("RECEIVE message ", msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("RECEIVE disconnect");
    io.emit("leave", socket.id);
  });

  socket.on("new-host", () => {
    console.log("RECEIVE new-host");
    const newId = generateId();
    rooms.push(newId);
    socket.join(newId);
    io.to(newId).emit("host-code", newId);
  })

  socket.on("join-code", (code) => {
    console.log("RECEIVE join-code " + code);
    if (rooms.indexOf(code) >= 0){
      socket.join(code);
      io.to(code).emit("join-success", { id: socket.id, instrument: randInstrument() });
    }
    console.log(rooms);
    console.log(socket.rooms);
  })

  socket.on("sound", (note) => {
    console.log("RECEIVE sound " + note);
    io.emit("sound", note);
  })
});

server.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});