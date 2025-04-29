import { useLocation } from "react-router-dom";
import Lith from "./instruments/Lith";
import Phon from "./instruments/Phon";
import Lung from "./instruments/Lung";

const Play = ({ socket }) => {
    const { instrumentName } = useLocation().state;

    console.log(instrumentName);

    const sendSound = (note) => {
        socket.emit("sound", {id: socket.id, note: note});
    }

    const sendGain = (gain) => {
        socket.emit("change-gain", {id: socket.id, value: gain});
    }

    const sendAttack = (note) => {
        socket.emit("attack", {id: socket.id, note: note});
    }

    const sendRelease = (note) => {
        socket.emit("release", {id: socket.id, note: note});
    }

    const sendDGain = (dGain) => {
        socket.emit("change-dgain", {id: socket.id, value: dGain});
    }

    return ( 
        <div className="play">
            {instrumentName === "lith" && <Lith sendSound={sendSound} sendGain={sendGain} />}
            {instrumentName === "phon" && <Phon sendAttack={sendAttack} sendRelease={sendRelease} sendGain={sendGain} />}
            {instrumentName === "lung" && <Lung sendAttack={sendAttack} sendRelease={sendRelease} sendDGain={sendDGain} />}
        </div>
    );
}
 
export default Play;