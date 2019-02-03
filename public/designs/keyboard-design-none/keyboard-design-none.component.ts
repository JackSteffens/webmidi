import { Component, OnInit } from '@angular/core';
import { KeyboardDesignInterface } from '../../models/keyboard-design-interface';
import { KeyboardConfig } from '../../models/keyboard-config';
import { Key } from '../../models/key';

@Component({
  selector: 'app-keyboard-design-none',
  templateUrl: './keyboard-design-none.component.html',
  styleUrls: ['./keyboard-design-none.component.scss']
})
export class KeyboardDesignNoneComponent implements OnInit, KeyboardDesignInterface {
  readonly name: string = 'SKELETON';
  readonly startKeyNumber: number = 21;
  readonly endKeyNumber: number = 108;
  keyboardConfig: KeyboardConfig;

  constructor() {
  }

  ngOnInit(): void {
    this.initKeys();
  }

  private initKeys(): void {
    let keys: Array<Key> = [];
    for (let index = this.startKeyNumber; index < this.endKeyNumber; index++) {
      keys.push(new Key(index));
    }
    this.keyboardConfig.keys = keys;
  }
}
