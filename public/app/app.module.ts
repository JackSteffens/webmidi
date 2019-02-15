import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { KeyboardComponent } from '../components/keyboard/keyboard.component';
import { MidiSelectorComponent } from '../components/midi-selector/midi-selector.component';
import { FormsModule } from '@angular/forms';
import { SetupPageComponent } from '../components/setup-page/setup-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SplashPageComponent } from '../components/splash-page/splash-page.component';
import { PlayerKeyboardComponent } from '../components/player-keyboard/player-keyboard.component';
import { KeyboardDesignMinimalComponent } from '../designs/keyboard-design-minimal/keyboard-design-minimal.component';
import { KeyboardDesignDirective } from '../directives/keyboard-design.directive';
import { KeyboardDesignArturiaKeystepComponent } from '../designs/keyboard-design-arturia-keystep/keyboard-design-arturia-keystep.component';
import { KeyboardDesignSelectorComponent } from '../components/keyboard-design-selector/keyboard-design-selector.component';
import { DesignPreviewComponent } from '../components/design-preview/design-preview.component';
import { KnobComponent } from '../components/knob/knob.component';
import { ArturiaSwitchComponent } from '../components/arturia-switch/arturia-switch.component';

// TODO Move to separate "routing" module
let routes: Routes = [
  { path: 'splash', component: SplashPageComponent },
  { path: 'setup', component: SetupPageComponent },
  { path: '', redirectTo: '/splash', pathMatch: 'full' }
];

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
    ArturiaSwitchComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule
  ],
  entryComponents: [KeyboardDesignMinimalComponent, KeyboardDesignArturiaKeystepComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
