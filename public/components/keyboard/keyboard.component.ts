import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { KeyboardConfig } from '../../models/keyboard-config';
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;
import { Key } from '../../models/key';
import MIDIInput = WebMidi.MIDIInput;
import { select, Store } from '@ngrx/store';
import {
  MIDIMessageActionPayload,
  NoteOffAction,
  NoteOnAction
} from '../../actions/midi-message.action';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit, OnChanges {
  @Input()
  keyboardConfig: KeyboardConfig;
  velocity: number = 100;
  shouldDispatchEvents = true;

  constructor(private changeDetectorRef: ChangeDetectorRef, private store: Store<MIDIMessageActionPayload>) {
  }

  ngOnInit() {
    this.initMidiMessageEventListener();
  }

  private initMidiMessageEventListener() {
    this.store
        .pipe(select('MIDIMessage'))
        .pipe(filter((midiMessage: MIDIMessageActionPayload) => {
          return (midiMessage && (midiMessage.command === 144 || midiMessage.command === 128));
        }))
        .subscribe((midiMessage: MIDIMessageActionPayload) => {
          if (this.keyboardConfig.input && this.keyboardConfig.input.name === midiMessage.sourceInputName) {
            console.log('KEYBOARD COMPONENT : ', midiMessage);
            let foundKey = this.searchKey(midiMessage.value1);
            this.sendToOutput(midiMessage.command, foundKey, midiMessage.value2);
          }
        });
  }

  /**
   * Not sure whether the KeyboardConfig of the component is ever going to change. But in case it does,
   * make sure to destroy all its listeners!
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    let keyboardConfigChanged = changes['keyboardConfig'];
    if (keyboardConfigChanged && keyboardConfigChanged.currentValue) {
      this.initInputMessageListener();

      if (keyboardConfigChanged.previousValue) {
        console.warn('TODO : UNBIND INPUT/OUTPUT ON-MESSAGE LISTENERS');
        // TODO unbind midi event listeners
      }
    }
  }

  /**
   * Binds an `onmidimessage` function to the MIDIInput of the given KeyboardConfig
   */
  initInputMessageListener(): void {
    this.keyboardConfig.inputObservable.subscribe((midiInput: MIDIInput) => {
      if (midiInput) {
        midiInput.onmidimessage = (e: MIDIMessageEvent) => {
          this.onMidiInputMessage(e);
        };
      }
    });
  }

  /**
   * Manually creating MIDIMessageEvent from UI inputs instead of hardware inputs
   * @param command MIDI Command
   * @param key MIDI Data 1, not required for some MIDI Commands
   * @param velocity Data 2, not required for some MIDI Commands
   */
  public generateFakeInputMessage(command: number, key?: number, velocity?: number) {
    let message = {
      data: new Uint8Array([command, key, velocity]),
      receivedTime: Date.now()
    };
    this.onMidiInputMessage(message);
  }

  /**
   * Object parameter is used for mocked input events, such as on-screen keyboard presses.
   * @param message
   */
  onMidiInputMessage(message: MIDIMessageEvent | { data: Uint8Array, receivedTime: number }) {
    let command: number = message.data[0];
    let key: number = message.data[1];
    let velocity: number = message.data[2];
    console.debug(message);
    let foundKey = null;

    if (command === 144 && velocity > 0) {
      // on
      if (this.shouldDispatchEvents) {
        this.store.dispatch(new NoteOnAction({
          command: command,
          value1: key,
          value2: velocity,
          commandName: undefined,
          timestamp: message.receivedTime,
          sourceInputName: this.keyboardConfig.input ? this.keyboardConfig.input.name : 'unknown',
          roomId: 'lobby',
          playerId: 'anonymous'
        }));
      }

    } else if (command === 128 || velocity === 0) {
      command = 128; // sometimes command 144 with velocity 0 is send instead. We need to re-adjust the command for the right Action to fire
      // off
      if (this.shouldDispatchEvents) {
        this.store.dispatch(new NoteOffAction({
          command: command,
          value1: key,
          value2: velocity,
          commandName: undefined,
          timestamp: message.receivedTime,
          sourceInputName: this.keyboardConfig.input ? this.keyboardConfig.input.name : 'unknown',
          roomId: 'lobby',
          playerId: 'anonymous'
        }));
      }
    }
    this.changeDetectorRef.detectChanges();
  }

  // TODO Move function
  searchKey(key: number): Key {
    let index = key - this.keyboardConfig.minKeyNumber;
    return this.keyboardConfig.keys[index];
  }

  /**
   * Replace with EventListeners once State Management is in place
   */
  public sendToOutput(command, key, velocity): void {
    this.toggleKey(key, velocity);
    if (this.validOutput(this.keyboardConfig.output)) {
      this.keyboardConfig.output.send([command, key.number, velocity]);
    } else {
      console.warn('No connected output port');
    }
  }

  // TODO Move
  validOutput(output): boolean {
    return output && output.connection && output.connection === 'open';
  }

  // TODO Move
  toggleKey(key, velocity): void {
    key.active = velocity !== 0;
  }
}
