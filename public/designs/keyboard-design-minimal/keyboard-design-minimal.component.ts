import { Component, OnInit } from '@angular/core';
import { KeyboardConfig } from '../../models/keyboard-config';
import { AbstractKeyboardDesign } from '../../models/abstract-keyboard-design';

@Component({
  selector: 'app-keyboard-design-minimal',
  templateUrl: './keyboard-design-minimal.component.html',
  styleUrls: ['./keyboard-design-minimal.component.scss']
})
export class KeyboardDesignMinimalComponent extends AbstractKeyboardDesign implements OnInit {
  static readonly designName: string = 'Minimal';
  static readonly startKeyNumber: number = 21;
  static readonly endKeyNumber: number = 107;

  public name: string = KeyboardDesignMinimalComponent.designName;
  public startKeyNumber: number = KeyboardDesignMinimalComponent.startKeyNumber;
  public endKeyNumber: number = KeyboardDesignMinimalComponent.endKeyNumber;
  keyboardConfig: KeyboardConfig;

  constructor() {
    super();
  }

  ngOnInit(): void {
    AbstractKeyboardDesign.initKeys(this.startKeyNumber, this.endKeyNumber, this.keyboardConfig);
  }
}
