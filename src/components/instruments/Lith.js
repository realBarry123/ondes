import { Instrument } from "../../Instrument";
import * as Tone from "tone";
import { percussiveSynth } from "../../Synths";

const Lith = () => {
    
    const notes = [
        {pitch: "A4", display: "☝︎"}, 
        {pitch: "A#4", display: "☜"}, 
        {pitch: "C5", display: "☝︎"}, 
        {pitch: "D#5", display: "☟"}, 
        {pitch: "F#5", display: "☟"}, 
        {pitch: "A5", display: "☝︎"}, 
        {pitch: "A#5", display: "☜"}, 
        {pitch: "C6", display: "☝︎"}, 
        {pitch: "D#6", display: "☞"}, 
        {pitch: "E6", display: "☝︎"}, 
        {pitch: "F#6", display: "☟"}
    ];

    const isTouchDevice = "ontouchstart" in window;

    const handlePlay = (note, e) => {
        e.preventDefault();
        instrument.play(note, "8n");
    }

    const instrument = new Instrument("percussive", percussiveSynth);

    return (
        <div className="lith">
            <div className="key-container">
                {notes.map(note => (
                    <button 
                        className="key-button" 
                        onMouseDown={!isTouchDevice ? (e) => {handlePlay(note.pitch, e)} : undefined}
                        onTouchStart={isTouchDevice ? (e) => {handlePlay(note.pitch, e)} : undefined}
                        key={note.pitch}
                        style={{height: "200px", width: "50px", fontSize: "30px"}}
                    >{note.display}</button>
                ))}
            </div>
        </div>
    );
}
 
export default Lith;