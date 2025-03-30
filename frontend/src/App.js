import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { io } from 'socket.io-client';
import Home from "./components/Home.js";
import Host from "./components/Host.js";
import Play from "./components/Play.js";
const socket = io(process.env.REACT_APP_SOCKET_URL);

function App() {
  
  console.log(socket);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home socket={socket}/>} />
          <Route exact path="/host" element={<Host socket={socket}/>} />
          <Route exact path="/play" element={<Play socket={socket}/>} />
        </Routes>
      </Router>
    </div>
  );
  
}

export default App;
