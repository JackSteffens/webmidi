import { Component, OnInit } from '@angular/core';
import { KeyboardConfig } from '../models/keyboard-config';
import MIDIAccess = WebMidi.MIDIAccess;
import { Key } from '../models/key';
import MIDIInputMap = WebMidi.MIDIInputMap;
import MIDIOutputMap = WebMidi.MIDIOutputMap;
import { CommandService } from '../services/command.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  keyboardModel: KeyboardConfig;

  constructor(private commandService: CommandService) {
  }

  ngOnInit(): void {
    navigator.requestMIDIAccess().then((access: MIDIAccess) => {
      let inputs: MIDIInputMap = access.inputs;
      let outputs: MIDIOutputMap = access.outputs;
      console.log('outputs : ', outputs.values());
      if ((inputs.size > 0) && (outputs.size > 0)) {

        let inputKey = inputs.keys().next().value;
        let outputKey = outputs.keys().next().value;
        let input = inputs.get(inputKey);
        let output = outputs.get(outputKey);

        let keys: Array<Key> = [];
        for (let index = 21; index < 108; index++) {
          keys.push(new Key(index));
        }
        this.keyboardModel = new KeyboardConfig(input, output, keys);
      } else {
        console.error('COULD NOT SELECT INPUT OR OUTPUT');
      }
    });
  }
}
