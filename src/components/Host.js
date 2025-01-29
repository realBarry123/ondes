import { useState, useEffect } from "react";

const Host = ({ socket }) => {

    const [roomCode, setRoomCode] = useState("");
    
    useEffect(() => {
        socket.emit("new-host", true);
    }, []);

    socket.on("host-code", (code) => {
        setRoomCode(code);
    })

    return ( 
        <div className="host">
            <p>{roomCode}</p>
        </div>
    );
}

export default Host;
