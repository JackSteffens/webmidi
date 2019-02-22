import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { KeyboardConfig } from '../../models/keyboard-config';
import { AbstractKeyboardDesign } from '../../models/abstract-keyboard-design';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MIDIMessageActionPayload } from '../../actions/midi-message.action';
import { CommandService } from '../../services/command.service';

@Component({
  selector: 'app-keyboard-design-arturia-keystep',
  templateUrl: './keyboard-design-arturia-keystep.component.html',
  styleUrls: ['./keyboard-design-arturia-keystep.component.scss']
})
export class KeyboardDesignArturiaKeystepComponent extends AbstractKeyboardDesign implements OnInit {
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

  public getModulationBarPercentage(): string {
    return this.calculatePercentage(this.modulation) + '%';
  }

  public getPitchBarPercentage(): string {
    return this.calculatePercentage(this.pitch) + '%';
  }

  private calculatePercentage(number: number): number {
    return 95 - (number / 127 * 90);
  }

  ngOnInit() {
    AbstractKeyboardDesign.initKeys(this.startKeyNumber, this.endKeyNumber, this.keyboardConfig);
    this.initMidiMessageActionsListener();
  }
}
