import { useState, useEffect } from "react";
import * as Tone from "tone";

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
        const onJoinSuccess = (id) => {
            setMembers(prevIds => [...prevIds, id]);
        }

        // When the room code is sent to the host
        const onHostCode = (code) => {
            setRoomCode(code);
        }

        const onSound = (note) => {
            synth.triggerAttackRelease(note, "8n", Tone.now());
        }

        socket.on("join-success", onJoinSuccess);
        socket.on("host-code", onHostCode);
        socket.on("sound", onSound);

        return () => {
            socket.off("join-success", onJoinSuccess);
            socket.off("host-code", onHostCode);
            socket.off("sound", onSound);
        }
    }, [socket]);

    useEffect(() => {
        console.log("Updated members list:", members);
    }, [members]); // Runs whenever `members` changes

    const startTone = () => {
        Tone.start();
        setAudioStarted(true);
    }

    return ( 
        <div className="host">
            {!audioStarted && <button onClick={startTone}>Start Audio</button>}
            <p>{roomCode}</p>
            {members.map(item => { return (
                <li>{item}</li>
            )})}
        </div>
    );
}

export default Host;
