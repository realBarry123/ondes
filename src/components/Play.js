import { useLocation } from "react-router-dom";
import Phon from "./instruments/Phon";
import Lung from "./instruments/Lung";
import Lith from "./instruments/Lith";

const Play = ({ socket }) => {
    const { instrument } = useLocation().state;

    console.log(instrument);
    const sendSound = () => {
        socket.emit("sound", "C4");
    }
    const sendAttack = () => {

    }
    const sendRelease = () => {

    }
    return ( 
        <div className="play">
            {instrument == "phon" && <Phon sendSound={sendSound}/>}
            {instrument == "lung" && <Lung sendSound={sendSound}/>}
            {instrument == "lith" && <Lith sendSound={sendSound}/>}
        </div>
    );
}
 
export default Play;