import { Type } from '@angular/core';
import { KeyboardConfig } from './keyboard-config';
import { KeyboardDesignInterface } from './keyboard-design-interface';

export class KeyboardDesign implements KeyboardDesignInterface {
  public name: string; // Will be set by the individual Components

  constructor(public component: Type<any>, public keyboardConfig: KeyboardConfig) {
  }
}
