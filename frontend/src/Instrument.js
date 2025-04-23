import * as Tone from "tone";
import { createPercussiveSynth, createSustainSynth, createDroneSynth } from "./Synths";
import Lith from "./components/instruments/Lith";

class Instrument {
    type;
    synth;
    html;
    name;

    constructor(instrumentName) {
        this.gain = -30;
        this.dGain = 0;
        this.name = instrumentName;
        if (instrumentName === "lith") {
            this.type = "percussive";
            this.synth = createPercussiveSynth();
        }
        else if (instrumentName === "phon") {
            this.type = "sustained";
            this.synth = createSustainSynth();
        }
        else if (instrumentName === "lung") {
            this.type = "drone";
            this.synth = createDroneSynth();
            this.updateGain();
        }
    }

    play(note) {
        if (this.type === "percussive") {
            this.synth.triggerAttackRelease(note, "8n", Tone.now());
        }
        else if (this.type === "sustained" || this.type === "drone") {
            this.synth.triggerAttack(note, "8n", Tone.now());
        }
    }

    stop(note) {
        if (this.type === "sustained" || this.type === "drone") {
            this.synth.triggerRelease(note);
        }
    }

    updateGain() {
        console.log("h");
        if (this.type === "drone") {
            this.gain = Math.max(Math.min(this.gain + this.dGain, 5), -30);
            console.log("gain: " + this.gain);
            this.synth.volume.value = this.gain;
        }
    }

    setDGain(gain) {
        this.dGain = gain;
    }
}

class DroneInstrument extends Instrument{
    constructor(synth) {
        super("drone", synth);
    }

    play(note) {
        this.synth.triggerAttack(note, "8n", Tone.now());
    }

    stop(note) {
        this.synth.triggerRelease(note);
    }

}

export {Instrument, DroneInstrument}