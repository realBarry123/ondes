import * as Tone from "tone";

class Instrument {
    type;
    synth;
    constructor(type, synth) {
        this.type = type;
        this.synth = synth;
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