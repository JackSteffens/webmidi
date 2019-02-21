// Library dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

// Keyboard designs
import { KeyboardDesignArturiaKeystepComponent } from '../designs/keyboard-design-arturia-keystep/keyboard-design-arturia-keystep.component';
import { KeyboardDesignMinimalComponent } from '../designs/keyboard-design-minimal/keyboard-design-minimal.component';

// NgRx Reducers - Move to a Reducers module if it gets too large
import { midiMessageReducer } from '../reducers/midi-message.reducer';

// Custom components
import { KeyboardDesignDirective } from '../directives/keyboard-design.directive';
import { KeyboardComponent } from '../components/keyboard/keyboard.component';
import { MidiSelectorComponent } from '../components/midi-selector/midi-selector.component';
import { SetupPageComponent } from '../components/setup-page/setup-page.component';
import { SplashPageComponent } from '../components/splash-page/splash-page.component';
import { PlayerKeyboardComponent } from '../components/player-keyboard/player-keyboard.component';
import { DesignPreviewComponent } from '../components/design-preview/design-preview.component';
import { KnobComponent } from '../components/knob/knob.component';
import { ArturiaSwitchComponent } from '../components/arturia-switch/arturia-switch.component';
import { ArturiaAltKeyComponent } from '../components/arturia-alt-key/arturia-alt-key.component';
import { ArturiaMediaKeyComponent } from '../components/arturia-media-key/arturia-media-key.component';
import { KeyboardDesignSelectorComponent } from '../components/keyboard-design-selector/keyboard-design-selector.component';
import { EventsDebugLoggerComponent } from '../components/events-debug-logger/events-debug-logger.component';

// TODO Move to separate "routing" module
let routes: Routes = [
  { path: 'splash', component: SplashPageComponent },
  { path: 'setup', component: SetupPageComponent },
  { path: '', redirectTo: '/splash', pathMatch: 'full' }
];

let keyboardDesigns = [KeyboardDesignMinimalComponent, KeyboardDesignArturiaKeystepComponent];

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    MidiSelectorComponent,
    SetupPageComponent,
    SplashPageComponent,
    PlayerKeyboardComponent,
    KeyboardDesignMinimalComponent,
    KeyboardDesignDirective,
    KeyboardDesignArturiaKeystepComponent,
    KeyboardDesignSelectorComponent,
    DesignPreviewComponent,
    KnobComponent,
    ArturiaSwitchComponent,
    ArturiaAltKeyComponent,
    ArturiaMediaKeyComponent,
    EventsDebugLoggerComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ MIDIMessage: midiMessageReducer }), // TODO Add reducers
    BrowserModule,
    FormsModule
  ],
  entryComponents: keyboardDesigns,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
