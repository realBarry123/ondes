import { useState } from "react";
import OrientAlert from "../OrientAlert";

const Lung = ({ sendAttack, sendRelease, sendDGain }) => {

    const [notes, setNotes] = useState([
        {pitch: "B3", display: "Œ", on: false},
        {pitch: "E3", display: "ɔ", on: false},
        {pitch: "G3", display: "Œ", on: false},
        {pitch: "C3", display: "ɔ", on: false},
        {pitch: "C#4", display: "Œ", on: false},
        {pitch: "G#3", display: "ɔ", on: false},
    ])

    const isTouchDevice = "ontouchstart" in window;

    const handleClick = (pitch) => {
        var notesCopy = notes.slice()
        var note = notesCopy.find(obj => {return obj.pitch === pitch})
        note.on = !note.on;
        setNotes(notesCopy);
    }

    return (
        <div className="lung" style={{display: "block"}}>
            <div className="key-container" style={{width: "400px", margin: "auto"}}>
                {notes.map(note => (
                    <button 
                        className={"key-button " + (note.on && "button-active")}
                        onMouseDown={!isTouchDevice ? (e) => {handleClick(note.pitch, e)} : undefined}
                        onTouchStart={isTouchDevice ? (e) => {handleClick(note.pitch, e)} : undefined}
                        key={note.pitch}
                        style={{height: "100px", width: "100px", fontSize: "40px"}}
                    >{note.display}</button>
                ))}
            </div>
            <button className="key-button" style={{height: "50px", width: "500px", fontSize: "40px", writingMode: "vertical-lr"}}></button>
            <OrientAlert targetOrientation="landscape" />
        </div>
    );
}

export default Lung;