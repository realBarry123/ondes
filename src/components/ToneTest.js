import * as Tone from "tone";

import { percussiveSynth } from "../Synths";

const ToneTest = () => {

    const playSound = () => {
        percussiveSynth.triggerAttackRelease(["C3", "F#3", "C4", "D4", "E4", "F4", "F#4", "G#4", "A#4", "B4", "C5"][Math.floor(Math.random() * 11)], "1n", Tone.now());
    }

    return ( 
        <div className="tone-test">
            <button 
                className="ui-button"
                onClick={playSound}
            >test sound</button>
        </div>
    );
}

export default ToneTest;