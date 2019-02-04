import { Component, OnInit } from '@angular/core';
import { KeyboardConfig } from '../../models/keyboard-config';
import { AbstractKeyboardDesign } from '../../models/abstract-keyboard-design';

@Component({
  selector: 'app-keyboard-design-arturia-keystep',
  templateUrl: './keyboard-design-arturia-keystep.component.html',
  styleUrls: ['./keyboard-design-arturia-keystep.component.scss']
})
export class KeyboardDesignArturiaKeystepComponent extends AbstractKeyboardDesign implements OnInit {
  static readonly designName: string = 'Arturia Keystep';
  static readonly startKeyNumber: number = 41; // 41
  static readonly endKeyNumber: number = 72; // 73

  public name: string = KeyboardDesignArturiaKeystepComponent.designName;
  public startKeyNumber: number = KeyboardDesignArturiaKeystepComponent.startKeyNumber;
  public endKeyNumber: number = KeyboardDesignArturiaKeystepComponent.endKeyNumber;
  keyboardConfig: KeyboardConfig;

  constructor() {
    super();
  }

  ngOnInit() {
    AbstractKeyboardDesign.initKeys(this.startKeyNumber, this.endKeyNumber, this.keyboardConfig);
  }
}
