import * as Tone from "tone";

const lowPass = new Tone.Filter({
    frequency: 4400, // Default cutoff
    type: "lowpass",
    rolloff: -24
}).toDestination();

const percussiveSynth = new Tone.PolySynth(Tone.Synth, {
    volume: -40,
    oscillator: {
        type: "custom",
        partials: [1, 0.2, 0.3, 0.6, 0.2, 0, 0, 0, 0, 0, 0, 0]
    },
    envelope: {
        attack: 0.005,
        decay: 3,
        sustain: 0.03,
        release: 5
    }
})

const limiter = new Tone.Limiter(-60);

percussiveSynth.connect(limiter).connect(lowPass).toDestination();

export { percussiveSynth };