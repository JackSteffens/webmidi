import { Component, OnInit } from '@angular/core';
import { KeyboardDesignSelectorService } from '../../services/keyboard-design-selector.service';
import { PlayerKeyboardService } from '../../services/player-keyboard.service';
import { KeyboardDesign } from '../../models/keyboard-design';
import { Key } from '../../models/key';
import { AbstractKeyboardDesign } from '../../models/abstract-keyboard-design';

@Component({
  selector: 'app-keyboard-design-selector',
  templateUrl: './keyboard-design-selector.component.html',
  styleUrls: ['./keyboard-design-selector.component.scss']
})
export class KeyboardDesignSelectorComponent implements OnInit {
  public keyboardDesigns: Map<string, KeyboardDesign>;
  public selectedDesign: KeyboardDesign;
  public minKey: number = 0;
  public maxKey: number = 128;

  constructor(private keyboardDesignSelectorService: KeyboardDesignSelectorService, private playerKeyboardService: PlayerKeyboardService) {
  }

  public onDesignSelected() {
    this.playerKeyboardService.playerKeyboardDesign = this.selectedDesign;
    this.maxKey = this.playerKeyboardService.playerKeyboardDesign.endKeyNumber;
    this.minKey = this.playerKeyboardService.playerKeyboardDesign.startKeyNumber;
  }

  public updateKeys() {
    AbstractKeyboardDesign.initKeys(this.minKey, this.maxKey, this.playerKeyboardService.keyboardConfig);
  }

  ngOnInit() {
    this.keyboardDesigns = this.keyboardDesignSelectorService.getAvailableDesigns(this.playerKeyboardService.keyboardConfig);
    console.log(this.keyboardDesigns);
  }
}
