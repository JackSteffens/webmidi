import { Key } from './key';
import MIDIInput = WebMidi.MIDIInput;
import MIDIOutput = WebMidi.MIDIOutput;

export class KeyboardConfig {
  // Keys
  keyLength: number;
  keys: Array<Key>;
  minKeyNumber: number;
  minKeyNote: string; // ex: 'A2' or 'A#2'
  maxKeyNumber: number;
  maxKeyNote: string; /// ex: 'A2' or 'A#2'
  // Midi Interface
  private _input: MIDIInput;
  private _output: MIDIOutput;

  constructor(input: MIDIInput, output: MIDIOutput, keys: Array<Key>) {
    this._input = input;
    this._output = output;
    this.keys = keys;
    this.keyLength = keys.length;
    if (keys.length > 0) {
      this.minKeyNumber = keys[0].number;
      this.minKeyNote = keys[0].note;
      this.maxKeyNumber = keys[keys.length - 1].number;
      this.maxKeyNote = keys[keys.length - 1].note;
    }
  }

  get input(): WebMidi.MIDIInput {
    return this._input;
  }

  set input(value: WebMidi.MIDIInput) {
    this._input = value;
  }

  get output(): WebMidi.MIDIOutput {
    return this._output;
  }

  set output(value: WebMidi.MIDIOutput) {
    this._output = value;
  }
}
