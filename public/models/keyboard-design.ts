import { Type } from '@angular/core';
import { KeyboardConfig } from './keyboard-config';
import { KeyboardDesignInterface } from './keyboard-design-interface';

export class KeyboardDesign implements KeyboardDesignInterface {
  public readonly name: string;
  public readonly endKeyNumber: number;
  public readonly startKeyNumber: number;

  constructor(public component: Type<any>, public keyboardConfig: KeyboardConfig) {
  }
}
