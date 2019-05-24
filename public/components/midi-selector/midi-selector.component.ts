import { Component, Input, OnInit } from '@angular/core';
import { MidiService } from '../../services/midi.service';
import { PlayerKeyboardService } from '../../services/player-keyboard.service';
import MIDIInput = WebMidi.MIDIInput;
import MIDIOutput = WebMidi.MIDIOutput;
import MIDIInputMap = WebMidi.MIDIInputMap;
import MIDIOutputMap = WebMidi.MIDIOutputMap;
import MIDIPort = WebMidi.MIDIPort;

@Component({
  selector: 'app-midi-selector',
  templateUrl: './midi-selector.component.html',
  styleUrls: ['./midi-selector.component.scss']
})
export class MidiSelectorComponent implements OnInit {
  @Input()
  inputPortSelectedFn?: Function;
  @Input()
  outputPortSelectedFn?: Function;
  public selectedInput: MIDIInput;
  public selectedOutput: MIDIOutput;
  public availableInputs: Array<MIDIInput>;
  public availableOutputs: Array<MIDIOutput>;
  public midiSupported: boolean = false;

  constructor(private playerKeyboardService: PlayerKeyboardService, private midiService: MidiService) {
  }

  public onInputSelected(): void {
    this.playerKeyboardService.input = this.selectedInput;
    if (typeof this.inputPortSelectedFn === 'function') {
      this.inputPortSelectedFn(this.selectedInput);
    }
  }

  public onOutputSelected(): void {
    this.playerKeyboardService.output = this.selectedOutput;
    if (typeof this.outputPortSelectedFn === 'function') {
      this.outputPortSelectedFn(this.selectedOutput);
    }
  }

  initInputs() {
    MidiService.getMIDIInputs()
               .then((inputs: MIDIInputMap) => {
                 this.availableInputs = Array.from(inputs.values());
               })
               .then(() => {
                 this.selectPreviousInput();
               });
  }

  selectPreviousInput(): void {
    this.selectedInput = this.getPreviousPort(this.playerKeyboardService.input, this.availableInputs);
    if (!this.selectedInput && this.availableInputs[0]) {
      this.selectedInput = this.availableInputs[0];
    }
    this.onInputSelected();
  }

  selectPreviousOutput(): void {
    this.selectedOutput = this.getPreviousPort(this.playerKeyboardService.output, this.availableOutputs);
    if (!this.selectedOutput && this.availableOutputs[0]) {
      this.selectedOutput = this.availableOutputs[this.availableOutputs.length - 1];
    }
    this.onOutputSelected();
  }

  getPreviousPort(previousPort: MIDIPort, portList: Array<MIDIPort>): any {
    if (previousPort && portList.length > 0) {
      return portList.find((port) => {
        return port.id === previousPort.id;
      });
    }
    return null;
  }

  private getSpeakerOutput(): MIDIOutput {
    return {
      send: (data: number[] | Uint8Array, timestamp?: Number) => {
        console.log('SPEAKER RECEIVED DATA:', data);
        this.midiService.virtualSend(data);
      },
      name: 'Speakers',
      manufacturer: 'none',
      state: 'connected',
      connection: 'open',
      id: 'Speakers',
      type: 'output',
      version: '0.0',
      close(): Promise<WebMidi.MIDIPort> {
        return new Promise((resolve) => {
          this.state = 'disconnected';
          resolve(this);
        });
      },
      open(): Promise<WebMidi.MIDIPort> {
        return new Promise((resolve) => {
          this.state = 'connected';
          resolve(this);
        });
      },
      addEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void {
      },
      clear(): void {
      },
      dispatchEvent: (e: Event) => true,
      onstatechange(e: WebMidi.MIDIConnectionEvent): void {
      },
      removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void {
      }
    };
  }

  initOutputs() {
    MidiService.getMIDIOutputs()
               .then((outputs: MIDIOutputMap) => {
                 this.availableOutputs = Array.from(outputs.values());
                 this.availableOutputs.push(this.getSpeakerOutput());
               })
               .then(() => {
                 this.selectPreviousOutput();
               });
  }

  ngOnInit() {
    if (navigator && navigator.requestMIDIAccess) {
      this.midiSupported = true;
      this.initInputs();
      this.initOutputs();
    } else {
      this.midiSupported = false;
      console.warn('This browser does not support WebMIDI');
    }
  }
}
