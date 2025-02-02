import { useState, useEffect } from "react";

const Host = ({ socket }) => {

    const [roomCode, setRoomCode] = useState("");
    const [members, setMembers] = useState([]);

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

        socket.on("join-success", onJoinSuccess);
        socket.on("host-code", onHostCode);

        return () => {
            socket.off("join-success", onJoinSuccess);
            socket.off("host-code", onHostCode);
        }
    }, [socket]);

    useEffect(() => {
        console.log("Updated members list:", members);
    }, [members]); // Runs whenever `members` changes

    return ( 
        <div className="host">
            <p>{roomCode}</p>
            {members.map(item => { return (
                <li>{item}</li>
            )})}
        </div>
    );
}

export default Host;
