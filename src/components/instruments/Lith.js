import { Instrument } from "../../Instrument";
import * as Tone from "tone";
import { percussiveSynth } from "../../Synths";

const Lith = () => {
    
    const notes = ["A4", "A#4", "C5", "D#5", "F#5", "A5", "A#5", "C6", "D#6", "E6", "F#6"];

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
                        onMouseDown={!isTouchDevice ? (e) => {handlePlay(note, e)} : undefined}
                        onTouchStart={isTouchDevice ? (e) => {handlePlay(note, e)} : undefined}
                        key={note}
                        style={{height: "200px", width:"50px"}}
                    >{note}</button>
                ))}
            </div>
        </div>
    );
}
 
export default Lith;