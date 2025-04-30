import * as Tone from "tone";

const createPercussiveSynth = () => {
    const lowPass = new Tone.Filter({
        frequency: 4400, // Default cutoff
        type: "lowpass",
        rolloff: -24
    }).toDestination();

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

    const limiter = new Tone.Limiter(-60);

    const gainNode = new Tone.Gain(0).toDestination();
    synth.connect(gainNode);

    return { synth, gainNode };
}

const createSustainSynth = () => {
    const synth = new Tone.PolySynth(Tone.Synth, {
        volume: -20,
        oscillator: {
            type: "custom",
            partials: [1, 0, 0.1, 0, 0.1, 0, 0.05, 0, 0, 0, 0, 0]
        },
        envelope: {
            attack: 0.005,
            decay: 3,
            sustain: 0.6,
            release: 3
        }
    })

    const gainNode = new Tone.Gain(0).toDestination();
    synth.connect(gainNode);

    return { synth, gainNode };
}

const createDroneSynth = () => {
    const synth = new Tone.PolySynth(Tone.Synth, {
        volume: -40,
        oscillator: {
            type: "custom",
            partials: [1, 0.5, 1, 1, 1, 0, 0, 0, 0.5, 0, 0, 0.5]
        },
        
        envelope: {
            attack: 0.1,
            decay: 2,
            sustain: 0.8,
            release: 3
        }
    })

    const gainNode = new Tone.Gain(0).toDestination();
    synth.connect(gainNode);

    return { synth, gainNode };
}

export { createPercussiveSynth, createSustainSynth, createDroneSynth };