import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { KeyboardConfig } from '../../models/keyboard-config';
import { AbstractKeyboardDesign } from '../../models/abstract-keyboard-design';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MIDIMessageActionPayload } from '../../actions/midi-message.action';
import { CommandService } from '../../services/command.service';
import MIDIInput = WebMidi.MIDIInput;

@Component({
  selector: 'app-keyboard-design-arturia-keystep',
  templateUrl: './keyboard-design-arturia-keystep.component.html',
  styleUrls: ['./keyboard-design-arturia-keystep.component.scss']
})
export class KeyboardDesignArturiaKeystepComponent extends AbstractKeyboardDesign implements OnInit, OnDestroy {
  static readonly designName: string = 'Arturia Keystep';
  static readonly startKeyNumber: number = 41; // 41
  static readonly endKeyNumber: number = 72; // 73
  public pitch: number = 64;
  public modulation: number = 0;

  public name: string = KeyboardDesignArturiaKeystepComponent.designName;
  public startKeyNumber: number = KeyboardDesignArturiaKeystepComponent.startKeyNumber;
  public endKeyNumber: number = KeyboardDesignArturiaKeystepComponent.endKeyNumber;
  keyboardConfig: KeyboardConfig;

  private subscription: Subscription;

  constructor(private store: Store<MIDIMessageActionPayload>, private changeDetectionRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    AbstractKeyboardDesign.initKeys(this.startKeyNumber, this.endKeyNumber, this.keyboardConfig);
    this.keyboardConfig.inputObservable.subscribe(() => {
      this.ngOnDestroy();
      this.initMidiMessageActionsListener();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private handleMidiMessageAction(midiMessage: MIDIMessageActionPayload) {
    if (CommandService.isCommandPitchWheel(midiMessage.command)) {
      this.pitch = midiMessage.value2;
      this.changeDetectionRef.detectChanges();
    } else if (CommandService.isCommandModulationWheel(midiMessage.command, midiMessage.value1)) {
      this.modulation = midiMessage.value2;
      this.changeDetectionRef.detectChanges();
    }
  }

  private initMidiMessageActionsListener(): void {
    if (this.keyboardConfig.input) {
      this.subscription = this.store
                              .pipe(select('MIDIMessage'))
                              .subscribe((midiMessageActionPayload: MIDIMessageActionPayload) => {
                                console.log('ARTURIA KEYSTEP', midiMessageActionPayload);
                                if (this.keyboardConfig.input
                                  && midiMessageActionPayload
                                  && this.keyboardConfig.input.name === midiMessageActionPayload.sourceInputName) {
                                  this.handleMidiMessageAction(midiMessageActionPayload);
                                }
                              });
    }
  }

  public getModulationBarPercentage(): string {
    return this.calculatePercentage(this.modulation) + '%';
  }

  public getPitchBarPercentage(): string {
    return this.calculatePercentage(this.pitch) + '%';
  }

  private calculatePercentage(number: number): number {
    return 95 - (number / 127 * 90);
  }
}
