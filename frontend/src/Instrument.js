import * as Tone from "tone";
import { createPercussiveSynth, createSustainSynth, createDroneSynth } from "./Synths";
import Lith from "./components/instruments/Lith";

class Instrument {
    type;
    synth;
    html;
    meter;
    name;

    constructor(instrumentName) {
        this.gain = 0;
        this.dGain = 0;
        this.name = instrumentName;
        if (instrumentName === "lith") {
            this.type = "percussive";
            ({synth: this.synth, gainNode: this.gainNode} = createPercussiveSynth());
        }
        else if (instrumentName === "phon") {
            this.type = "sustained";
            ({synth: this.synth, gainNode: this.gainNode} =createSustainSynth());
        }
        else if (instrumentName === "lung") {
            this.type = "drone";
            ({synth: this.synth, gainNode: this.gainNode} = createDroneSynth());
            this.updateGain();
        }else{
            console.error("Unknown instrument type:", instrumentName);
            return;
        }
    }

    play(note) {
        if (this.type === "percussive") {
            this.synth.triggerAttackRelease(note, "8n", Tone.now());
        }
        else if (this.type === "sustained" || this.type === "drone") {
            this.synth.triggerRelease(note);
            this.synth.triggerAttack(note, "8n", Tone.now());
        }
    }

    stop(note) {
        if (this.type === "sustained" || this.type === "drone") {
            this.synth.triggerRelease(note);
        }
    }

    updateGain() {
        console.log("Updating gain:", this.gain);
        const newGain = Math.max(Math.min(this.gain + this.dGain, 1), 0);
        this.gain = newGain;
        this.gainNode.gain.rampTo(this.gain);
        console.log("Updated gain:", this.gain);
    }

    dispose() {
        if (this.synth) this.synth.dispose();
        if (this.gainNode) this.gainNode.dispose();
    }

    setDGain(gain) {
        this.dGain = gain;
    }
}

export {Instrument}