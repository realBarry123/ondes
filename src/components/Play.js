import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Instrument } from "../Instrument";

const Play = ({ socket }) => {
    const { instrumentName } = useLocation().state;
    const instrument = new Instrument(instrumentName);

    useEffect(() => {
        const onChangeGain = ({id, value}) => {
            if (id == socket.id){
                console.log(value);
            }
        }

        socket.on("change-gain", onChangeGain);

        return () => {
            socket.off("change-gain", onChangeGain);
        }
    }, [socket])

    console.log(instrumentName);

    const sendSound = (note) => {
        socket.emit("sound", {id: socket.id, note: note});
    }

    const sendAttack = () => {

    }

    const sendRelease = () => {

    }

    return ( 
        <div className="play">
            {instrument.getJSX(sendSound)}
        </div>
    );
}
 
export default Play;