import { useState, useEffect } from "react";
import * as Tone from "tone";
import { Instrument } from "../Instrument";

const Host = ({ socket }) => {
    
    const [roomCode, setRoomCode] = useState("");
    const [members, setMembers] = useState([]);
    const [audioStarted, setAudioStarted] = useState(false);

    useEffect(() => {
        socket.emit("new-host", true);
        setInterval(() => {
            members.forEach((member) => {member.instrument.updateGain()});
        }, 100);
    }, [members]);

    useEffect(() => {

        // When someone succeeds in joining the room
        const onJoinSuccess = ({ id, instrumentName }) => {
            const instrument = new Instrument(instrumentName);
            setMembers(prevMembers => [...prevMembers, {id: id, instrument: instrument}]);
        }

        const onLeave = (id) => {
            // const member = members.find(member => member.id === id);
            // member.instrument.dispose();
            // These lines keep causing me bugs for no reason, will get back ASAP
            setMembers(prevMembers => prevMembers.filter(member => member.id !== id));
        }

        // When the room code is sent to the host
        const onHostCode = (code) => {
            console.log("Your code is: " + code);
            setRoomCode(code);
        }

        const onSound = ({ id, note }) => {
            setMembers(prevMembers => {
                const member = prevMembers.find(member => member.id === id);
                if (!member) return prevMembers;
                member.instrument.play(note);
                return prevMembers;
            });
        }

        const onAttack = ({ id, note }) => {
            setMembers(prevMembers => {
                const member = prevMembers.find(member => member.id === id);
                if (!member) return prevMembers;
                member.instrument.play(note);
                return prevMembers;
            });
        }

        const onRelease = ({ id, note }) => {
            setMembers(prevMembers => {
                const member = prevMembers.find(member => member.id === id);
                if (!member) return prevMembers;
                member.instrument.stop(note);
                return prevMembers;
            });
        }

        const onChangeGain = ({ id, value }) => {
            setMembers(prevMembers => {
                const member = prevMembers.find(member => member.id === id);
                if (!member) return prevMembers;
                member.instrument.synth.volume.value = value;
                return prevMembers;
            });
        }

        const onChangeDGain = ({ id, value }) => {
            setMembers(prevMembers => {
                const member = prevMembers.find(member => member.id === id);
                if (!member) return prevMembers;
                member.instrument.dGain = value;
                return prevMembers;
            });
        }

        socket.on("join-success", onJoinSuccess);
        socket.on("host-code", onHostCode);
        socket.on("sound", onSound);
        socket.on("attack", onAttack);
        socket.on("release", onRelease);
        socket.on("change-gain", onChangeGain);
        socket.on("change-dgain", onChangeDGain);
        socket.on("leave", onLeave);

        return () => {
            socket.off("join-success", onJoinSuccess);
            socket.off("host-code", onHostCode);
            socket.off("sound", onSound);
            socket.off("attack", onAttack);
            socket.off("release", onRelease);
            socket.off("change-gain", onChangeGain);
            socket.off("change-dgain", onChangeDGain);
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

            <h2 style={{fontSize: "50px", letterSpacing: "10px"}}>{roomCode}</h2>

            {members.map(item => { return (
                <div>
                    <div>{item.id}</div>
                </div>
            )})}
        </div>
    );
}

export default Host;
