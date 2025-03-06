import * as Tone from "tone";

const ToneTest = () => {

    const limiter = new Tone.Limiter(-60).toDestination();

    const polySynth = new Tone.PolySynth(Tone.Synth, {
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

    polySynth.connect(limiter);
    

    const playSound = () => {
        polySynth.triggerAttackRelease(["C3", "F#3", "C4", "D4", "E4", "F4", "F#4", "G#4", "A#4", "B4", "C5"][Math.floor(Math.random() * 11)], "1n", Tone.now());
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