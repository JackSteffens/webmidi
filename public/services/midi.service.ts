import { Injectable } from '@angular/core';
import MIDIAccess = WebMidi.MIDIAccess;
import MIDIInputMap = WebMidi.MIDIInputMap;
import MIDIOutputMap = WebMidi.MIDIOutputMap;
import MIDIPort = WebMidi.MIDIPort;
import { CommandService } from './command.service';
import * as Tone from 'tone';

@Injectable({
  providedIn: 'root'
})
export class MidiService {
  // TODO The amount of notes that can be played at once depends on this polyphony value (I think). Figure out what the optimal setting is
  private synth = new Tone.PolySynth(1).toMaster();

  public static requestMidiAccess(): Promise<MIDIAccess> {
    return navigator.requestMIDIAccess();
  }

  public static getMIDIInputs(): Promise<MIDIInputMap> {
    return MidiService.requestMidiAccess().then((midiAccess: MIDIAccess) => {
      return midiAccess.inputs;
    });
  }

  public static getMIDIOutputs(): Promise<MIDIOutputMap> {
    return MidiService.requestMidiAccess().then((midiAccess: MIDIAccess) => {
      return midiAccess.outputs;
    });
  }

  static isMIDIPortConnected(midiPort: MIDIPort): boolean {
    return midiPort && midiPort.connection !== 'closed';
  }

  virtualSend(data) {
    let note = CommandService.getNote(data[1]);
    console.log('VIRTUAL NOTE PLAYING ' + data + ' Note : ' + note);
    if (data[0] === 144) {
      this.synth.triggerAttack([note], undefined, data[2]); // note, delay, velocity (data[1], ?, data[2])
    } else {
      this.synth.triggerRelease([note]);
    }
  }

  constructor() {
  }
}
