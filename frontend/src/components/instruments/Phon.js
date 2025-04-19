import { useState, useEffect } from "react";
import OrientAlert from "../OrientAlert";

const Phon = ({ sendAttack, sendRelease, sendGain }) => {

    const notes = [
        {pitch: "D#5", display: "☞"}, 
        {pitch: "E5", display: "☝︎"}, 
        {pitch: "A4", display: "☝︎"}, 
        {pitch: "A#4", display: "☜"}, 
        {pitch: "D#4", display: "☟"}, 
        {pitch: "A3", display: "☝︎"}, 
        {pitch: "A#3", display: "☜"}, 
        {pitch: "C4", display: "☝︎"},
        {pitch: "F#4", display: "☟"}, 
        {pitch: "C5", display: "☝︎"}, 
        {pitch: "F#5", display: "☟"}
    ];


    const [gainValue, setGainValue] = useState(0);

    const isTouchDevice = "ontouchstart" in window;

    useEffect(() => {
        sendGain(gainValue);
    }, [gainValue])

    const handleAttack = (pitch, e) => {
        e.preventDefault();
        sendAttack(pitch);
    }

    const handleRelease = (pitch, e) => {
        e.preventDefault();
        sendRelease(pitch);
    }

    return (
        <div className="phon" style={{display: "flex"}}>
            <div className="key-container">
                {notes.map(note => (
                    <button 
                        className="key-button" 
                        onMouseDown={!isTouchDevice ? (e) => {handleAttack(note.pitch, e)} : undefined}
                        onTouchStart={isTouchDevice ? (e) => {handleAttack(note.pitch, e)} : undefined}
                        onMouseUp={!isTouchDevice ? (e) => {handleRelease(note.pitch, e)} : undefined}
                        onTouchEnd={isTouchDevice ? (e) => {handleRelease(note.pitch, e)} : undefined}
                        key={note.pitch}
                        style={{height: "200px", width: "50px", fontSize: "40px"}}
                    >{note.display}</button>
                ))}
            </div>
            <input 
                type="range" 
                min="-30"
                max="5"
                value={gainValue}
                onChange={(e) => (setGainValue(e.target.value))}
            />
            <OrientAlert targetOrientation="landscape" />
        </div>
    );
}
 
export default Phon;