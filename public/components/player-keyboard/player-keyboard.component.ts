import { Component, Input, OnInit } from '@angular/core';
import { KeyboardConfig } from '../../models/keyboard-config';
import { MidiService } from '../../services/midi.service';
import { Key } from '../../models/key';
import MIDIInputMap = WebMidi.MIDIInputMap;
import MIDIOutputMap = WebMidi.MIDIOutputMap;
import MIDIAccess = WebMidi.MIDIAccess;

@Component({
  selector: 'app-player-keyboard',
  templateUrl: './player-keyboard.component.html',
  styleUrls: ['./player-keyboard.component.scss']
})
export class PlayerKeyboardComponent implements OnInit {
  keyboardModel: KeyboardConfig;

  constructor(private midiService: MidiService) {
  }

  listenOnPortChanges(): void {
    this.midiService.getSelectedInputObservable().subscribe((input) => {
      console.log('OBSERVER DETECTED INPUT CHANGE : ', input);
      if (this.keyboardModel) {
        this.keyboardModel.input = MidiService.selectedInput;
      }
    });

    this.midiService.getSelectedOutputObservable().subscribe((output) => {
      console.log('OBSERVER DETECTED OUTPUT CHANGE', output);
      if (this.keyboardModel) {
        this.keyboardModel.output = output;
      }
    });
  }

  ngOnInit() {
    let keys: Array<Key> = [];
    for (let index = 21; index < 108; index++) {
      keys.push(new Key(index));
    }
    this.keyboardModel = new KeyboardConfig(null, null, keys);
    this.listenOnPortChanges();
  }

}
