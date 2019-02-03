import { KeyboardConfig } from './keyboard-config';

export interface KeyboardDesignInterface {
  readonly name: string;
  readonly startKeyNumber: number;
  readonly endKeyNumber: number;
  keyboardConfig: KeyboardConfig
}
