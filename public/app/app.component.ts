import { Component, OnInit } from '@angular/core';
import { KeyboardConfig } from '../models/keyboard-config';
import { CommandService } from '../services/command.service';
import { Key } from '../models/key';
import MIDIAccess = WebMidi.MIDIAccess;
import MIDIOutputMap = WebMidi.MIDIOutputMap;
import MIDIInputMap = WebMidi.MIDIInputMap;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  keyboardModel: KeyboardConfig;

  /*
  CommandService requires to be injected on startup, because OnInit() needs to be called.
  Key.class needs the data that's being generated in CommandService.ngOnInit(), but the Key class cannot
  inject the service itself. Need to find a way how to circumvent this.
   */
  constructor(private commandService: CommandService) {
  }

  ngOnInit(): void {
    navigator.requestMIDIAccess().then((access: MIDIAccess) => {
      let inputs: MIDIInputMap = access.inputs;
      let outputs: MIDIOutputMap = access.outputs;
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
