import { Component, OnInit } from '@angular/core';
import { KeyboardDesignSelectorService } from '../../services/keyboard-design-selector.service';
import { PlayerKeyboardService } from '../../services/player-keyboard.service';
import { KeyboardDesign } from '../../models/keyboard-design';
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

  // FIXME Don't use the KeyboardDesign as a util class !!!!
  public updateKeys() {
    AbstractKeyboardDesign.initKeys(this.minKey, this.maxKey, this.playerKeyboardService.keyboardConfig);
  }

  public selectDesign(designName: string) {
    this.selectedDesign = this.keyboardDesigns.get(designName);
    // prevent animation lag
    window.requestAnimationFrame(() => {
      this.playerKeyboardService.playerKeyboardDesign = this.selectedDesign;
      this.maxKey = this.playerKeyboardService.playerKeyboardDesign.endKeyNumber;
      this.minKey = this.playerKeyboardService.playerKeyboardDesign.startKeyNumber;
    });
  }

  private preSelectDesign() {
    if (this.playerKeyboardService.playerKeyboardDesign) {
      this.selectedDesign = this.keyboardDesigns.get(this.playerKeyboardService.playerKeyboardDesign.designName);
      this.minKey = this.playerKeyboardService.keyboardConfig.minKeyNumber;
      this.maxKey = this.playerKeyboardService.keyboardConfig.maxKeyNumber;
    }
  }

  ngOnInit() {
    this.keyboardDesigns = this.keyboardDesignSelectorService.getAvailableDesigns(this.playerKeyboardService.keyboardConfig);
    this.preSelectDesign();
  }
}
