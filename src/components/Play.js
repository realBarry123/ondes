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
            <button onClick={sendSound}>send sound</button>
        </div>
    );
}
 
export default Play;