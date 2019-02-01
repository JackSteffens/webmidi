import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { KeyboardComponent } from '../components/keyboard/keyboard.component';
import { MidiSelectorComponent } from '../components/midi-selector/midi-selector.component';
import { FormsModule } from '@angular/forms';
import { SetupPageComponent } from '../components/setup-page/setup-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SplashPageComponent } from '../components/splash-page/splash-page.component';

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
    SplashPageComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
