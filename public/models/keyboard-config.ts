import { Key } from './key';
import MIDIInput = WebMidi.MIDIInput;
import MIDIOutput = WebMidi.MIDIOutput;
import { BehaviorSubject, Observable } from 'rxjs';

export class KeyboardConfig {
  // Keys
  keyLength: number;
  private _keys: Array<Key>;
  minKeyNumber: number;
  minKeyNote: string; // ex: 'A2' or 'A#2'
  maxKeyNumber: number;
  maxKeyNote: string; /// ex: 'A2' or 'A#2'
  // Midi Interface
  private _input: MIDIInput;
  private _output: MIDIOutput;
  private inputBehaviourSubject: BehaviorSubject<MIDIInput> = new BehaviorSubject(this._input);
  private outputBehaviourSubject: BehaviorSubject<MIDIOutput> = new BehaviorSubject(this._output);

  constructor(input: MIDIInput, output: MIDIOutput, keys: Array<Key>) {
    this._input = input;
    this._output = output;
    this._keys = keys;
    this.keyLength = keys.length;
    if (keys.length > 0) {
      this.minKeyNumber = keys[0].number;
      this.minKeyNote = keys[0].note;
      this.maxKeyNumber = keys[keys.length - 1].number;
      this.maxKeyNote = keys[keys.length - 1].note;
    }
  }

  get inputObservable(): Observable<MIDIInput> {
    return this.inputBehaviourSubject.asObservable();
  }

  get outputObservable(): Observable<MIDIOutput> {
    return this.outputBehaviourSubject.asObservable();
  }

  get keys(): Array<Key> {
    return this._keys;
  }

  set keys(newKeys: Array<Key>) {
    this._keys = newKeys;
    this.keyLength = newKeys.length;
    if (this._keys.length > 0) {
      this.minKeyNumber = this._keys[0].number;
      this.minKeyNote = this._keys[0].note;
      this.maxKeyNumber = this._keys[this._keys.length - 1].number;
      this.maxKeyNote = this._keys[this._keys.length - 1].note;
    }
  }

  get input(): WebMidi.MIDIInput {
    return this._input;
  }

  set input(input: WebMidi.MIDIInput) {
    this._input = input;
    this.inputBehaviourSubject.next(input);
  }

  get output(): WebMidi.MIDIOutput {
    return this._output;
  }

  set output(value: WebMidi.MIDIOutput) {
    this._output = value;
  }
}
