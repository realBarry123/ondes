import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lith from "./instruments/Lith";

const Play = ({ socket }) => {
    const { instrumentName } = useLocation().state;

    console.log(instrumentName);

    const sendSound = (note) => {
        socket.emit("sound", {id: socket.id, note: note});
    }

    const sendGain = (gain) => {
        socket.emit("gainChange", {id: socket.id, gain: gain});
    }

    const sendAttack = () => {

    }

    const sendRelease = () => {

    }

    return ( 
        <div className="play">
            {instrumentName == "lith" && <Lith sendSound={sendSound}/>}
        </div>
    );
}
 
export default Play;