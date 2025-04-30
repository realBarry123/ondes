import { useState, useEffect } from "react";

const Lith = ({ sendSound, sendGain }) => {
    
    const notes = [
        {pitch: "D#6", display: "☞"}, 
        {pitch: "E6", display: "☝︎"}, 
        {pitch: "A5", display: "☝︎"}, 
        {pitch: "A#5", display: "☜"}, 
        {pitch: "D#5", display: "☟"}, 
        {pitch: "A4", display: "☝︎"}, 
        {pitch: "A#4", display: "☜"}, 
        {pitch: "C5", display: "☝︎"},
        {pitch: "F#5", display: "☟"}, 
        {pitch: "C6", display: "☝︎"}, 
        {pitch: "F#6", display: "☟"}
    ];


    const [gainValue, setGainValue] = useState(50);

    const isTouchDevice = "ontouchstart" in window;

    useEffect(() => {
        sendGain(gainValue/100);
    }, [gainValue])

    const handlePlay = (pitch, e) => {
        e.preventDefault();
        sendSound(pitch);
    }

    return (
        <div className="lith" style={{display: "flex"}}>
            <div className="key-container">
                {notes.map(note => (
                    <button 
                        className="key-button" 
                        onMouseDown={!isTouchDevice ? (e) => {handlePlay(note.pitch, e)} : undefined}
                        onTouchStart={isTouchDevice ? (e) => {handlePlay(note.pitch, e)} : undefined}
                        key={note.pitch}
                        style={{height: "200px", width: "50px", fontSize: "40px"}}
                    >{note.display}</button>
                ))}
            </div>
            <input 
                type="range" 
                min="0"
                max="100"
                value={gainValue}
                onChange={(e) => (setGainValue(e.target.value))}
            />
        </div>
    );
}
 
export default Lith;