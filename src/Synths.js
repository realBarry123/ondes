import * as Tone from "tone";

const percussiveSynth = new Tone.PolySynth(Tone.Synth, {
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

const limiter = new Tone.Limiter(-60).toDestination();

percussiveSynth.connect(limiter);

export { percussiveSynth };