import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { KeyboardConfig } from '../../models/keyboard-config';
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;
import { Key } from '../../models/key';
import MIDIInput = WebMidi.MIDIInput;
import { select, Store } from '@ngrx/store';
import {
  MIDIMessageActionPayload, ModulationWheelAction,
  NoteOffAction,
  NoteOnAction, PitchWheelAction
} from '../../actions/midi-message.action';
import { Subscription } from 'rxjs';
import MIDIOutput = WebMidi.MIDIOutput;
import { CommandService } from '../../services/command.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  keyboardConfig: KeyboardConfig;
  @Input()
  defaultVelocity: number = 100;
  private shouldDispatchEvents = true;
  private subscription: Subscription;

  constructor(private changeDetectorRef: ChangeDetectorRef, private store: Store<MIDIMessageActionPayload>) {
  }

  ngOnInit() {
    this.initMidiMessageActionsListener();
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private initMidiMessageActionsListener(): void {
    this.subscription = this.store
                            .pipe(select('MIDIMessage'))
                            .subscribe((midiMessageActionPayload: MIDIMessageActionPayload) => {
                              if (this.keyboardConfig.input
                                && midiMessageActionPayload
                                && this.keyboardConfig.input.name === midiMessageActionPayload.sourceInputName) {
                                this.handleMidiMessageAction(midiMessageActionPayload);
                              }
                            });
  }

  /**
   * Binds an `onmidimessage` function to the MIDIInput of the given KeyboardConfig
   */
  initInputMessageListener(): void {
    this.keyboardConfig.inputObservable.subscribe((midiInput: MIDIInput) => {
      if (midiInput) {
        midiInput.onmidimessage = (midiMessageEvent: MIDIMessageEvent) => {
          this.onMidiInputMessage(midiMessageEvent);
          this.changeDetectorRef.detectChanges(); // Required because Angular does not automatically trigger Change detection for midi events
        };
      }
    });
  }

  /**
   * Manually creating MIDIMessageEvent from UI inputs instead of hardware inputs
   * @param command MIDI Command
   * @param key MIDI Data 1, not required for some MIDI Commands
   * @param velocity Data 2, not required for some MIDI Commands
   * TODO let this create a realistic MIDIMessageEvent
   */
  public createManualMIDIMessageEvent(command: number, key?: number, velocity?: number) {
    let message: MIDIMessageEvent | any = {
      data: new Uint8Array([command, key, velocity]),
      timeStamp: performance.now()
    };
    this.onMidiInputMessage(message);
  }

  /**
   * Object parameter is used for mocked input events, such as on-screen keyboard presses.
   * @param message
   */
  private onMidiInputMessage(message: MIDIMessageEvent) {
    let command: number = message.data[0];
    let val1: number = message.data[1];
    console.debug(message);

    if (this.shouldDispatchEvents) {
      if (CommandService.isCommandNoteOff(command)) {
        this.store.dispatch(new NoteOffAction(this.generateMidiMessageActionPayload(message)));
      } else if (CommandService.isCommandNoteOn(command)) {
        this.store.dispatch(new NoteOnAction(this.generateMidiMessageActionPayload(message)));
      } else if (CommandService.isCommandModulationWheel(command, val1)) {
        this.store.dispatch(new ModulationWheelAction(this.generateMidiMessageActionPayload(message)));
      } else if (CommandService.isCommandPitchWheel(command)) {
        this.store.dispatch(new PitchWheelAction(this.generateMidiMessageActionPayload(message)));
      }
    }
  }

  private generateMidiMessageActionPayload(messageEvent: MIDIMessageEvent): MIDIMessageActionPayload {
    return {
      command: messageEvent.data[0],
      value1: messageEvent.data[1],
      value2: messageEvent.data[2],
      timestamp: messageEvent.timeStamp,
      sourceInputName: this.keyboardConfig.input ? this.keyboardConfig.input.name : 'null',
      roomId: 'TO BE IMPLEMENTED', // GET FROM ROOM SERVICE/STORE
      playerId: 'TO BE IMPLEMENTED' // GET FROM USER SERVICE/STORE
    };
  }

  private getKey(keyNumber: number): Key {
    let index = keyNumber - this.keyboardConfig.minKeyNumber;
    return this.keyboardConfig.keys[index];
  }

  private handleMidiMessageAction(midiMessage: MIDIMessageActionPayload) {
    if (CommandService.isCommandNoteOn(midiMessage.command) || CommandService.isCommandNoteOff(midiMessage.command)) {
      let key = this.getKey(midiMessage.value1);
      KeyboardComponent.toggleKey(key, midiMessage.command, midiMessage.value2);
    }

    this.sendToOutput(midiMessage.command, midiMessage.value1, midiMessage.value2);
  }

  public sendToOutput(command: number, keyNumber: number, velocity: number): void {
    if (KeyboardComponent.validOutput(this.keyboardConfig.output, this.keyboardConfig.input)) {
      this.keyboardConfig.output.send([command, keyNumber, velocity]);
    } else {
      console.warn('No connected output port');
    }
  }

  // TODO Move
  static validOutput(output: MIDIOutput, input: MIDIInput): boolean {
    return output && output.connection && output.connection === 'open' && output.name !== input.name;
  }

  // TODO Move
  static toggleKey(key: Key, command: number, velocity: number): void {
    key.active = (command === 144 && velocity > 0);
  }
}
