import { useState, useEffect } from "react";
import * as Tone from "tone";
import { Instrument } from "../Instrument";

const Host = ({ socket }) => {
    
    const [roomCode, setRoomCode] = useState("");
    const [members, setMembers] = useState([]);
    const [audioStarted, setAudioStarted] = useState(false);

    const synth = new Tone.Synth().toDestination();

    useEffect(() => {
        socket.emit("new-host", true);
    }, []);

    useEffect(() => {

        // When someone succeeds in joining the room
        const onJoinSuccess = ({ id, instrumentName }) => {
            const instrument = new Instrument(instrumentName);
            setMembers(prevMembers => [...prevMembers, {id: id, instrument: instrument}]);
        }

        const onLeave = (id) => {
            setMembers(prevMembers => prevMembers.filter(member => member.id !== id));
        }

        // When the room code is sent to the host
        const onHostCode = (code) => {
            console.log("Your code is: " + code);
            setRoomCode(code);
        }

        const onSound = ({ id, note }) => {
            console.log(id);
            console.log(note);
            setMembers(prevMembers => {
                const member = prevMembers.find(member => member.id === id);
                if (!member) return prevMembers;
                member.instrument.play(note);
                return prevMembers;
            });
        }

        socket.on("join-success", onJoinSuccess);
        socket.on("host-code", onHostCode);
        socket.on("sound", onSound);
        socket.on("leave", onLeave);

        return () => {
            socket.off("join-success", onJoinSuccess);
            socket.off("host-code", onHostCode);
            socket.off("sound", onSound);
            socket.off("leave", onLeave);
        }
    }, [socket]);

    useEffect(() => {
        console.log("Updated members list:", members);
    }, [members]); // Runs whenever `members` changes

    const startTone = () => { // Turn on Tone.js
        Tone.start();
        setAudioStarted(true);
    }

    return ( 
        <div className="host">
            {!audioStarted && <button 
                className="ui-button"
                onClick={startTone}
            >start audio</button>}

            <p>{roomCode}</p>

            {members.map(item => { return (
                <div>
                    <div>{item.instrument.name}</div>
                </div>
            )})}
        </div>
    );
}

export default Host;
