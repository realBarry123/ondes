import { Instrument } from "../../Instrument.js";
import * as Tone from "tone";

const Lith = () => {
    const notes = ["A#4", "C5", "D#5", "F#5", "A5", "A#5", "C6", "D#6", "E6", "F#6"];
    const limiter = new Tone.Limiter(-60).toDestination();
    
    const synth = new Tone.PolySynth(Tone.Synth, {
        volume: -40,
        oscillator: {
            type: "custom",
            partials: [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0.01]
        },
        envelope: {
            attack: 0.5,
            decay: 0.1,
            sustain: 0.3,
            release: 1
        }
    })

    synth.connect(limiter);

    const instrument = new Instrument("percussive", synth);

    return (
        <div className="lith">
            {notes.map(note => (
                <button 
                    className="ui-button" 
                    onClick={() => {instrument.play(note, "8n")}}
                    key={note}
                >{note}</button>
            ))}
        </div>
    );
}
 
export default Lith;