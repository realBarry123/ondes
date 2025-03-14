import { Instrument } from "../../Instrument.js";
import * as Tone from "tone";

const Lith = () => {
    
    const notes = ["A4", "A#4", "C5", "D#5", "F#5", "A5", "A#5", "C6", "D#6", "E6", "F#6"];
    const limiter = new Tone.Limiter(-60).toDestination();

    const isTouchDevice = "ontouchstart" in window;
    
    const synth = new Tone.PolySynth(Tone.Synth, {
        volume: -40,
        oscillator: {
            type: "custom",
            partials: [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0.01]
        },
        envelope: {
            attack: 0.01,
            decay: 0.01,
            sustain: 0.5,
            release: 4
        }
    })

    const handlePlay = (note, e) => {
        e.preventDefault();
        instrument.play(note, "8n");
    }

    synth.connect(limiter);

    const instrument = new Instrument("percussive", synth);

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