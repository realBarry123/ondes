import * as Tone from "tone";
import { createPercussiveSynth, createSustainSynth } from "./Synths";
import Lith from "./components/instruments/Lith";

class Instrument {
    type;
    synth;
    html;
    name;

    constructor(instrumentName) {
        this.name = instrumentName;
        if (instrumentName == "lith") {
            this.type = "percussive";
            this.synth = createPercussiveSynth();
        }
        else if (instrumentName == "phon") {
            this.type = "sustained";
            this.synth = createSustainSynth();
        }
    }

    play(note) {
        if (this.type == "percussive") {
            this.synth.triggerAttackRelease(note, "8n", Tone.now());
        }
        else if (this.type == "sustained") {
            this.synth.triggerAttack(note, "8n", Tone.now());
        }
    }

    stop(note) {
        if (this.type == "sustained") {
            this.synth.triggerRelease(note);
        }
    }
}

class DroneInstrument extends Instrument{
    constructor(synth) {
        super("drone", synth);
    }


}

export {Instrument, DroneInstrument}