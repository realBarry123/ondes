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

const pickInstrument = (instruments) => {
	const countPhon = instruments.filter(instrument => instrument === "phon").length;
	const countLung = instruments.filter(instrument => instrument === "lung").length;
	const countLith = instruments.filter(instrument => instrument === "lith").length;
	console.log("countPhon: " + countPhon + ", countLung: " + countLung + ", countLith: " + countLith)

	if (countPhon === countLung && countLung === countLith) {
		return "lung";
	}
	if (countLung === 0) {
		return "lung";
	}
	if (countLith === 0) {
		return "lith";
	}
	if (countPhon === 0) {
		return "phon";
	}
	
	return ["phon", "lung", "lith"][Math.floor(Math.random() * 3)];
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
		rooms.push({code: newId, instruments: []});
		socket.join(newId);
		io.to(newId).emit("host-code", newId);
	});

	socket.on("join-code", (code) => {
		console.log("RECEIVE join-code " + code);

		const foundRoom = rooms.find(room => room.code === code);

		console.log(foundRoom);

		if (typeof foundRoom !== "undefined"){
			socket.join(code);

			const instrument = pickInstrument(foundRoom.instruments);

			console.log(instrument);
			foundRoom.instruments.push(instrument);

			io.to(code).emit("join-success", { id: socket.id, instrumentName: instrument });
		}
		console.log(rooms);
		console.log(socket.rooms);
	});

	socket.on("sound", ({ id, note }) => {
		const roomId = Array.from(socket.rooms)[1];
		console.log(roomId + ": RECEIVE sound " + note);
		socket.to(roomId).emit("sound", {id: id, note: note});
	});

	socket.on("attack", ({ id, note }) => {
		const roomId = Array.from(socket.rooms)[1];
		console.log(roomId + ": RECEIVE attack " + note);
		socket.to(roomId).emit("attack", {id: id, note: note});
	})

	socket.on("release", ({ id, note }) => {
		const roomId = Array.from(socket.rooms)[1];
		console.log(roomId + ": RECEIVE release " + note);
		socket.to(roomId).emit("release", {id: id, note: note});
	})

	socket.on("change-gain", ({ id, value }) => {
		const roomId = Array.from(socket.rooms)[1];
		console.log("RECEIVE change-gain " + id + ", " + value)
		socket.to(roomId).emit("change-gain", {id: id, value: value});
	});
	
	socket.on("change-dgain", ({ id, value }) => {
		const roomId = Array.from(socket.rooms)[1];
		console.log("RECEIVE change-dgain " + id + ", " + value)
		socket.to(roomId).emit("change-dgain", {id: id, value: value});
	});
});

server.listen(4000, "0.0.0.0", () => {
	console.log("Server running on port 4000");
});