import * as Tone from "tone";

const createPercussiveSynth = () => {

    const synth = new Tone.PolySynth(Tone.Synth, {
        volume: -40,
        oscillator: {
            type: "custom",
            partials: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        envelope: {
            attack: 0.005,
            decay: 3,
            sustain: 0.03,
            release: 2
        }
    })

    synth.toDestination();

    return synth;
}

const createSustainSynth = () => {
    const synth = new Tone.PolySynth(Tone.Synth, {
        volume: -60,
        oscillator: {
            type: "custom",
            partials: [1, 0, 0.1, 0, 0.1, 0, 0.05, 0, 0, 0, 0, 0]
        },
        envelope: {
            attack: 0.005,
            decay: 3,
            sustain: 0.6,
            release: 2
        }
    })

    synth.toDestination();

    return synth; 
}

const createDroneSynth = () => {
    const synth = new Tone.PolySynth(Tone.Synth, {
        volume: -60,
        oscillator: {
            type: "custom",
            partials: [1, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        envelope: {
            attack: 0.005,
            decay: 3,
            sustain: 0.6,
            release: 2
        }
    })

    synth.toDestination();

    return synth; 
}

export { createPercussiveSynth, createSustainSynth, createDroneSynth };