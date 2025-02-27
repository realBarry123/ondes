import { useLocation } from "react-router-dom";
import Phon from "./instruments/Phon";

const Play = ({ socket }) => {
    const { instrument } = useLocation().state;

    console.log(instrument);
    const sendSound = () => {
        socket.emit("sound", "C4");
    }
    return ( 
        <div className="play">
            {instrument == "phon" && <Phon sendSound={sendSound}/>}
        </div>
    );
}
 
export default Play;