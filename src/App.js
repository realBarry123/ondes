import { useState, useEffect } from "react";
import "./App.css";
import io from 'socket.io-client';
const socket = io('http://localhost:4000');

function App() {

  const [input, setInput] = useState("");

  // Send a message to the server
  const sendMessage = (msg) => {
    socket.emit("message", msg);
    console.log(msg);
  };

  socket.on("message", (msg) => {
    setInput(msg);
    console.log(msg);
  })

  useEffect(() => {

    sendMessage(input);

    //return () => socket.disconnect();
  }, [input]);

  return (
    <div className="App">
      <h2>{input}</h2>
      <textarea 
	      required
	      value={input}
	      onChange={(e) => setInput(e.target.value)}
	    />
    </div>
  );
  
}

export default App;
