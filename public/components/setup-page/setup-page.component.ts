import { Component, OnInit } from '@angular/core';
import MIDIInput = WebMidi.MIDIInput;
import MIDIOutput = WebMidi.MIDIOutput;

@Component({
  selector: 'app-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent implements OnInit {

  public onInputSelectedFn(input: MIDIInput) {
    console.log('INPUT SELECTED, CALLBACK FN : ', input);
  }

  public onOutputSelectedFn(output: MIDIOutput) {
    console.log('OUTPUT SELECTED, CALLBACK FN : ', output);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
