import { Injectable } from '@angular/core';
import MIDIAccess = WebMidi.MIDIAccess;
import MIDIInputMap = WebMidi.MIDIInputMap;
import MIDIOutputMap = WebMidi.MIDIOutputMap;
import MIDIPort = WebMidi.MIDIPort;

@Injectable({
  providedIn: 'root'
})
export class MidiService {
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

  constructor() {
  }
}
