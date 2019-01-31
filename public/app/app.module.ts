import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { KeyboardComponent } from '../components/keyboard/keyboard.component';
import { MidiSelectorComponent } from '../components/midi-selector/midi-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    MidiSelectorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
