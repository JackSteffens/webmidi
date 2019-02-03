import { Component, Input, OnInit } from '@angular/core';
import { KeyboardConfig } from '../../models/keyboard-config';
import { fromEvent } from 'rxjs/observable/fromEvent';
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;
import { Key } from '../../models/key';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  @Input()
  keyboardConfig: KeyboardConfig;
  velocity: number = 100;

  constructor() {
  }

  ngOnInit() {
    this.initInputEventWatcher();
  }

  public sendToOutput(command, key, velocity): void {
    this.toggleKey(key, velocity);
    if (this.validOutput(this.keyboardConfig.output)) {
      this.keyboardConfig.output.send([command, key.number, velocity]);
    } else {
      console.warn('No connected output port');
    }
    // TODO MultiPlayer feature
    // var roomId = RoomService.getRoomId();
    // if (roomId) {
    //   sendToServer(roomId, key);
    // }
  }

  validOutput(output): boolean {
    return output && output.connection && output.connection === 'open';
  }


  toggleKey(key, velocity): void {
    key.active = velocity !== 0;
  }

  // TODO NOT SURE WHETHER 'fromEvent' ACTUALLY LISTENS TO MIDI EVENTS. RESEARCH THIS
  initInputEventWatcher(): void {
    fromEvent(document, 'keyevent').subscribe((midiMessageEvent: MIDIMessageEvent) => {
      console.log('keyevent received');
      console.log(midiMessageEvent);

      let command: number = midiMessageEvent.data[0]; // Key pressed (128) or released (144) command
      let keyNumber: number = midiMessageEvent.data[1];
      let velocity: number = midiMessageEvent.data[2];
      let key: Key = this.keyboardConfig.keys[keyNumber - this.keyboardConfig.minKeyNumber];

      if (key) {
        key.active = velocity !== 0 || command === 128;
      }

      command = velocity === 0 && command === 144 ? 128 : command;

      if (!this.inputSameSourceAsOutput()) {
        if (this.validOutput(this.keyboardConfig.output)) {
          this.keyboardConfig.output.send([command, keyNumber, velocity]);
        }
      }
    });
  }

  inputSameSourceAsOutput(): boolean {
    return this.keyboardConfig.output.name === this.keyboardConfig.input.name;
  }

}
