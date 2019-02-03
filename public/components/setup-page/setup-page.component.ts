import { Component, OnInit } from '@angular/core';
import MIDIInput = WebMidi.MIDIInput;
import MIDIOutput = WebMidi.MIDIOutput;
import { PlayerKeyboardService } from '../../services/player-keyboard.service';
import { KeyboardDesign } from '../../models/keyboard-design';
import { KeyboardDesignNoneComponent } from '../../designs/keyboard-design-none/keyboard-design-none.component';
import { KeyboardDesignArturiaKeystepComponent } from '../../designs/keyboard-design-arturia-keystep/keyboard-design-arturia-keystep.component';

@Component({
  selector: 'app-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent implements OnInit {
  public skeletonDesign;
  public arturiaKeystepDesign;

  public onInputSelectedFn(input: MIDIInput) {
    console.log('INPUT SELECTED, CALLBACK FN : ', input);
  }

  public onOutputSelectedFn(output: MIDIOutput) {
    console.log('OUTPUT SELECTED, CALLBACK FN : ', output);
  }

  public setPlayerKeyboardDesign(keyboardDesignComponent: KeyboardDesign): void {
    this.playerKeyboardService.playerKeyboardDesign = keyboardDesignComponent;
  }

  constructor(private playerKeyboardService: PlayerKeyboardService) {
  }

  ngOnInit() {
    this.skeletonDesign = new KeyboardDesign(KeyboardDesignNoneComponent, this.playerKeyboardService.keyboardConfig);
    this.arturiaKeystepDesign = new KeyboardDesign(KeyboardDesignArturiaKeystepComponent, this.playerKeyboardService.keyboardConfig);
  }
}
