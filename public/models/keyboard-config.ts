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
  input: MIDIInput;
  output: MIDIOutput;

  constructor(input: MIDIInput, output: MIDIOutput, keys: Array<Key>) {
    this.input = input;
    this.output = output;
    this.keys = keys;
    this.keyLength = keys.length;
    if (keys.length > 0) {
      this.minKeyNumber = keys[0].number;
      this.minKeyNote = keys[0].note;
      this.maxKeyNumber = keys[keys.length - 1].number;
      this.maxKeyNote = keys[keys.length - 1].note;
    }
  }
}
