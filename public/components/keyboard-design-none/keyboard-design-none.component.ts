import { Component } from '@angular/core';
import { KeyboardDesignInterface } from '../../models/keyboard-design-interface';
import { KeyboardConfig } from '../../models/keyboard-config';

@Component({
  selector: 'app-keyboard-design-none',
  templateUrl: './keyboard-design-none.component.html',
  styleUrls: ['./keyboard-design-none.component.scss']
})
export class KeyboardDesignNoneComponent implements KeyboardDesignInterface {
  readonly name: string = 'SKELETON';
  keyboardConfig: KeyboardConfig;

  constructor() {
  }
}
