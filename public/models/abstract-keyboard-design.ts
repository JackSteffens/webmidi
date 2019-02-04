import { KeyboardConfig } from './keyboard-config';
import { Key } from './key';

export abstract class AbstractKeyboardDesign {
  abstract keyboardConfig: KeyboardConfig;
  abstract name: string;
  abstract startKeyNumber: number;
  abstract endKeyNumber: number;

  /*
  TODO Improve its performance. Starts lagging when the amount of keys is large
   */
  static initKeys(startKeyNumber: number, endKeyNumber: number, keyboardConfig: KeyboardConfig): void {
    let keys: Array<Key> = [];
    for (let index = startKeyNumber; index <= endKeyNumber; index++) {
      keys.push(new Key(index));
    }
    keyboardConfig.keys = keys;
  };
}
