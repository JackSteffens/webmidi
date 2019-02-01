import { Injectable } from '@angular/core';
import MIDIAccess = WebMidi.MIDIAccess;
import MIDIInputMap = WebMidi.MIDIInputMap;
import MIDIOutputMap = WebMidi.MIDIOutputMap;
import MIDIInput = WebMidi.MIDIInput;
import MIDIOutput = WebMidi.MIDIOutput;
import MIDIPort = WebMidi.MIDIPort;
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MidiService {
  public static selectedInput: MIDIInput;
  public static selectedOutput: MIDIOutput;
  private selectedInputBehaviourSubject: BehaviorSubject<MIDIInput> = new BehaviorSubject<MIDIInput>(MidiService.selectedInput);
  private selectedOutputBehaviourSubject: BehaviorSubject<MIDIOutput> = new BehaviorSubject<MIDIOutput>(MidiService.selectedOutput);

  public requestMidiAccess(): Promise<MIDIAccess> {
    return navigator.requestMIDIAccess();
  }

  public getSelectedInputObservable(): Observable<MIDIInput> {
    return this.selectedInputBehaviourSubject.asObservable();
  }

  public getSelectedOutputObservable(): Observable<MIDIOutput> {
    return this.selectedOutputBehaviourSubject.asObservable();
  }

  public getMIDIInputs(): Promise<MIDIInputMap> {
    return this.requestMidiAccess().then((midiAccess: MIDIAccess) => {
      return midiAccess.inputs;
    });
  }

  public getMIDIOutputs(): Promise<MIDIOutputMap> {
    return this.requestMidiAccess().then((midiAccess: MIDIAccess) => {
      return midiAccess.outputs;
    });
  }

  static closeMIDIPort(midiPort: MIDIPort): Promise<MIDIPort> {
    return midiPort.close();
  }

  static isMIDIPortConnected(midiPort: MIDIPort): boolean {
    return midiPort && midiPort.connection !== 'closed';
  }

  static isPreviousInputPortConnected(): boolean {
    return MidiService.isMIDIPortConnected(MidiService.selectedInput);
  }

  static isPreviousOutputPortConnected(): boolean {
    return MidiService.isMIDIPortConnected(MidiService.selectedOutput);
  }

  closeOldInputAndOpenNewInput(input: MIDIInput) {
    return MidiService.closeMIDIPort(MidiService.selectedInput)
                      .then(() => {
                        return input.open();
                      }, (reason) => {
                        console.error(reason);
                        return MidiService.selectedInput; // Continue with the currently open connection
                      });
  }

  closeOldOutputAndOpenNewOutput(output: MIDIOutput) {
    return MidiService.closeMIDIPort(MidiService.selectedOutput)
                      .then(() => {
                        return output.open();
                      }, (reason) => {
                        console.error(reason);
                        return MidiService.selectedOutput;
                      });
  }

  public setSelectedInput(input: MIDIInput): Promise<MIDIInput> {
    let openPortPromise: Promise<MIDIPort>;

    if (MidiService.isPreviousInputPortConnected()) {
      openPortPromise = this.closeOldInputAndOpenNewInput(input);
    } else {
      openPortPromise = input.open();
    }

    return openPortPromise.then((newInput: MIDIInput) => {
      MidiService.selectedInput = newInput;
      this.selectedInputBehaviourSubject.next(newInput);
      return MidiService.selectedInput;
    });
  }

  public setSelectedOutput(output: MIDIOutput): Promise<MIDIOutput> {
    let openPortPromise: Promise<MIDIPort>;

    if (MidiService.isPreviousOutputPortConnected()) {
      openPortPromise = this.closeOldOutputAndOpenNewOutput(output);
    } else {
      openPortPromise = output.open();
    }

    return openPortPromise.then((newOutput: MIDIOutput) => {
      MidiService.selectedOutput = newOutput;
      this.selectedOutputBehaviourSubject.next(newOutput);
      return MidiService.selectedOutput;
    });
  }

  constructor() {
  }
}
