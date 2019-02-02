import { Component, Input, OnInit } from '@angular/core';
import MIDIInput = WebMidi.MIDIInput;
import MIDIOutput = WebMidi.MIDIOutput;
import MIDIInputMap = WebMidi.MIDIInputMap;
import MIDIOutputMap = WebMidi.MIDIOutputMap;
import { MidiService } from '../../services/midi.service';
import MIDIPort = WebMidi.MIDIPort;
import { PlayerKeyboardService } from '../../services/player-keyboard.service';

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

  constructor(private playerKeyboardService: PlayerKeyboardService) {
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
  }

  selectPreviousOutput(): void {
    this.selectedOutput = this.getPreviousPort(this.playerKeyboardService.output, this.availableOutputs);
  }

  getPreviousPort(previousPort: MIDIPort, portList: Array<MIDIPort>): any {
    if (previousPort && portList.length > 0) {
      return portList.find((port) => {
        return port.id === previousPort.id;
      });
    }
    return null;
  }

  initOutputs() {
    MidiService.getMIDIOutputs()
               .then((outputs: MIDIOutputMap) => {
                 this.availableOutputs = Array.from(outputs.values());
               })
               .then(() => {
                 this.selectPreviousOutput();
               });
  }

  ngOnInit() {
    this.initInputs();
    this.initOutputs();
  }
}
