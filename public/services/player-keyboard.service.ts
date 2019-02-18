import { Injectable } from '@angular/core';
import { KeyboardDesign } from '../models/keyboard-design';
import MIDIOutput = WebMidi.MIDIOutput;
import MIDIInput = WebMidi.MIDIInput;
import { KeyboardConfig } from '../models/keyboard-config';
import { BehaviorSubject, Observable } from 'rxjs';
import MIDIPort = WebMidi.MIDIPort;
import { MidiService } from './midi.service';
import { Key } from '../models/key';

@Injectable({
  providedIn: 'root'
})
export class PlayerKeyboardService {
  private _input: MIDIInput;
  private _output: MIDIOutput;
  private _playerKeyboardDesign: KeyboardDesign;
  private readonly _keyboardConfig: KeyboardConfig;

  // FIXME Remove these. You can find the in/out-puts in the keyboardConfig
  private _inputBehaviourSubject: BehaviorSubject<MIDIInput> = new BehaviorSubject<MIDIInput>(this._input);
  private _outputBehaviourSubject: BehaviorSubject<MIDIOutput> = new BehaviorSubject<MIDIOutput>(this._output);
  private _playerKeyboardDesignBehaviourSubject: BehaviorSubject<KeyboardDesign> = new BehaviorSubject<KeyboardDesign>(this._playerKeyboardDesign);
  private _playerKeyboardConfigBehaviourSubject: BehaviorSubject<KeyboardConfig> = new BehaviorSubject<KeyboardConfig>(this._keyboardConfig);

  get inputObservable(): Observable<MIDIInput> {
    return this._inputBehaviourSubject.asObservable();
  }

  get outputObservable(): Observable<MIDIOutput> {
    return this._outputBehaviourSubject.asObservable();
  }

  get playerKeyboardDesignObservable(): Observable<KeyboardDesign> {
    return this._playerKeyboardDesignBehaviourSubject.asObservable();
  }

  get playerKeyboardConfigObservable(): Observable<KeyboardConfig> {
    return this._playerKeyboardConfigBehaviourSubject.asObservable();
  }

  get input(): WebMidi.MIDIInput {
    return this._input;
  }

  set input(receivedInput: WebMidi.MIDIInput) {
    let openPortPromise: Promise<MIDIPort>;

    if (this.isCurrentInputPortStillConnected()) {
      openPortPromise = this.closeOldInputAndOpenNewInput(receivedInput);
    } else {
      openPortPromise = receivedInput.open();
    }

    openPortPromise.then((newInput: MIDIInput) => {
      this._input = newInput;
      this._keyboardConfig.input = newInput;
      this._inputBehaviourSubject.next(this.input);
    });
  }

  private isCurrentInputPortStillConnected(): boolean {
    return MidiService.isMIDIPortConnected(this.input);
  }

  private closeOldInputAndOpenNewInput(inputToBeOpened: MIDIInput) {
    return this.input.close()
               .then(() => {
                 return inputToBeOpened.open();
               }, (reason) => {
                 console.error(reason);
                 return this.input; // Continue with the currently open connection
               });
  }

  get output(): WebMidi.MIDIOutput {
    return this._output;
  }

  set output(receivedOutput: WebMidi.MIDIOutput) {
    let openPortPromise: Promise<MIDIPort>;

    if (this.isCurrentOutputPortStillConnected()) {
      openPortPromise = this.closeOldOutputAndOpenNewOutput(receivedOutput);
    } else {
      openPortPromise = receivedOutput.open();
    }

    openPortPromise.then((newOutput: MIDIOutput) => {
      this._output = newOutput;
      this._keyboardConfig.output = newOutput;
      this._outputBehaviourSubject.next(this.output);
    });
  }

  private isCurrentOutputPortStillConnected(): boolean {
    return MidiService.isMIDIPortConnected(this.output);
  }

  closeOldOutputAndOpenNewOutput(newOutput: MIDIOutput) {
    return this.output.close()
               .then(() => {
                 return newOutput.open();
               }, (reason) => {
                 console.error(reason);
                 return this.output;
               });
  }

  get playerKeyboardDesign(): KeyboardDesign {
    return this._playerKeyboardDesign;
  }

  set playerKeyboardDesign(keyboardDesign: KeyboardDesign) {
    this._playerKeyboardDesign = keyboardDesign;
    this._playerKeyboardDesignBehaviourSubject.next(keyboardDesign);
  }

  get keyboardConfig(): KeyboardConfig {
    return this._keyboardConfig;
  }

  constructor() {
    this._keyboardConfig = new KeyboardConfig(null, null, []);
  }
}
