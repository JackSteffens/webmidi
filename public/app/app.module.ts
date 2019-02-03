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
import { KeyboardDesignNoneComponent } from '../designs/keyboard-design-none/keyboard-design-none.component';
import { KeyboardDesignDirective } from '../directives/keyboard-design.directive';
import { KeyboardDesignArturiaKeystepComponent } from '../designs/keyboard-design-arturia-keystep/keyboard-design-arturia-keystep.component';

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
    KeyboardDesignNoneComponent,
    KeyboardDesignDirective,
    KeyboardDesignArturiaKeystepComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule
  ],
  entryComponents: [KeyboardDesignNoneComponent, KeyboardDesignArturiaKeystepComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
