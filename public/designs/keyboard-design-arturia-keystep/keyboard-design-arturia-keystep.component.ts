import { Component, OnInit } from '@angular/core';
import { KeyboardDesignInterface } from '../../models/keyboard-design-interface';
import { KeyboardConfig } from '../../models/keyboard-config';
import { Key } from '../../models/key';

@Component({
  selector: 'app-keyboard-design-arturia-keystep',
  templateUrl: './keyboard-design-arturia-keystep.component.html',
  styleUrls: ['./keyboard-design-arturia-keystep.component.scss']
})
export class KeyboardDesignArturiaKeystepComponent implements OnInit, KeyboardDesignInterface {
  readonly name: string = 'Arturia Keystep';
  readonly startKeyNumber: number = 41; // 41
  readonly endKeyNumber: number = 73; // 73
  keyboardConfig: KeyboardConfig;

  constructor() {
  }

  private initKeys() {
    let keys: Array<Key> = [];
    for (let index = this.startKeyNumber; index < this.endKeyNumber; index++) {
      keys.push(new Key(index));
    }
    this.keyboardConfig.keys = keys;
  }

  ngOnInit() {
    this.initKeys();
  }

}
