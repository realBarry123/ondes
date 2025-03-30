import * as Tone from "tone";

const createPercussiveSynth = () => {
    const lowPass = new Tone.Filter({
        frequency: 4400, // Default cutoff
        type: "lowpass",
        rolloff: -24
    }).toDestination();

    const percussiveSynth = new Tone.PolySynth(Tone.Synth, {
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

    const limiter = new Tone.Limiter(-60);

    percussiveSynth.toDestination();

    return percussiveSynth;
}

const createSustainSynth = () => {
    const sustainSynth = new Tone.PolySynth(Tone.Synth, {
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

    sustainSynth.toDestination();

    return sustainSynth; 
}

export { createPercussiveSynth, createSustainSynth };