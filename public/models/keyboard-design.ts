import { Type } from '@angular/core';
import { KeyboardConfig } from './keyboard-config';
import { AbstractKeyboardDesign } from './abstract-keyboard-design';

export class KeyboardDesign {
  public readonly designName: string;
  public readonly endKeyNumber: number;
  public readonly startKeyNumber: number;

  // Added `any` to shut up the linter
  constructor(public designComponent: any | Type<any> | AbstractKeyboardDesign, public keyboardConfig: KeyboardConfig) {
    this.designName = designComponent.designName;
    this.endKeyNumber = designComponent.endKeyNumber;
    this.startKeyNumber = designComponent.startKeyNumber;
  }
}
