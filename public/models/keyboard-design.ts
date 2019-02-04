import { Type } from '@angular/core';
import { KeyboardConfig } from './keyboard-config';
import { AbstractKeyboardDesign } from './abstract-keyboard-design';

export class KeyboardDesign {
  public readonly name: string;
  public readonly endKeyNumber: number;
  public readonly startKeyNumber: number;

  // Added `any` to shut up the linter
  constructor(public component: any | Type<any> | AbstractKeyboardDesign, public keyboardConfig: KeyboardConfig) {
    this.name = component.name;
    this.endKeyNumber = component.endKeyNumber;
    this.startKeyNumber = component.startKeyNumber;
  }

  initKeys(): void {
  }
}
