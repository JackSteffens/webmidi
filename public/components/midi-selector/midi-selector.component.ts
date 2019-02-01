import { Component, Input, OnInit } from '@angular/core';
import MIDIInput = WebMidi.MIDIInput;
import MIDIOutput = WebMidi.MIDIOutput;
import MIDIInputMap = WebMidi.MIDIInputMap;
import MIDIOutputMap = WebMidi.MIDIOutputMap;
import { MidiService } from '../../services/midi.service';

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

  constructor(private midiService: MidiService) {
  }

  public onInputSelected(): void {
    this.midiService.setSelectedInput(this.selectedInput)
      .then((input) => {
        if (typeof this.inputPortSelectedFn === 'function') {
          this.inputPortSelectedFn(input);
        }
      });
  }

  public onOutputSelected(): void {
    this.midiService.setSelectedOutput(this.selectedOutput)
      .then((output) => {
        if (typeof this.outputPortSelectedFn === 'function') {
          this.outputPortSelectedFn(output);
        }
      });
  }

  ngOnInit() {
    this.midiService.getMIDIInputs().then((inputs: MIDIInputMap) => {
      this.availableInputs = Array.from(inputs.values());
    });
    this.midiService.getMIDIOutputs().then((outputs: MIDIOutputMap) => {
      this.availableOutputs = Array.from(outputs.values());
    });
  }

}
