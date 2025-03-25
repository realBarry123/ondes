import * as Tone from "tone";
import { percussiveSynth } from "./Synths";
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
            this.synth = percussiveSynth;
            this.getJSX = (sendSound) => {
                return (<Lith sendSound={sendSound}/>);
            }
        }
    }

    play(note, duration) {
        if (this.type == "percussive") {
            this.synth.triggerAttackRelease(note, duration, Tone.now());
        }
        else if (this.type == "sustained") {
            this.synth.triggerAttack(note, duration, Tone.now());
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