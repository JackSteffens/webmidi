import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MidiService } from '../../services/midi.service';

@Component({
  selector: 'app-splash-page',
  templateUrl: './splash-page.component.html',
  styleUrls: ['./splash-page.component.scss']
})
export class SplashPageComponent implements OnInit {
  progressMessage: string;

  constructor(private router: Router, private midiService: MidiService) {
  }

  initSession(): Promise<any> {
    this.progressMessage = 'Restoring session';
    return new Promise((resolve, reject) => {
      console.log('SESSION PROMISE ACTIVATED');

      setTimeout(resolve, 2000);

      // fail
      // setTimeout(() => {
      //   reject('COULD NOT LOAD SESSION. GOING TO /LOGIN');
      //   this.failInitialization('Restoring session FAILED', '/login');
      // }, 2000);
    });
  }

  initPortConfiguration(): Promise<any> {
    this.progressMessage = 'Restoring MIDI configuration';
    return new Promise((resolve, reject) => {
      console.log('PORT PROMISE ACTIVATED');

      // setTimeout(resolve, 2000);

      // fail
      setTimeout(() => {
        reject('COULD NOT LOAD MIDI CONFIG. GOING TO /SETUP/MIDI');
        this.failInitialization('Restoring MIDI configuration FAILED', '/setup');
      }, 2000);
    });
  }

  initKeyboard(): Promise<any> {
    this.progressMessage = 'Restoring Keyboard settings';
    return new Promise((resolve, reject) => {
      console.log('KEYBOARD PROMISE ACTIVATED');

      setTimeout(resolve, 2000);

      // fail
      // setTimeout(() => {
      //   reject('COULD NOT LOAD KEYBOARD CONFIG. GOING TO /SETUP/KEYBOARD');
      //   this.failInitialization('Restoring Keyboard settings FAILED', '/setup/keyboard');
      // }, 2000);
    });
  }


  failInitialization(message: string, url: string) {
    this.progressMessage = message;
    setTimeout(() => {
      this.router.navigate([url]);
    }, 1000);
  }

  breakChain(reason: string): Promise<never> {
    return Promise.reject(reason);
  }

  done(): void {
    this.progressMessage = 'DONE';
    // If all succeeds, goto Lobby
    setTimeout(() => {
      this.router.navigate(['/setup']);
    }, 1000);

  }

  ngOnInit() {
    this.initSession()
        .then(() => this.initPortConfiguration(), this.breakChain)
        .then(() => this.initKeyboard(), this.breakChain)
        .then(() => this.done(), (reason) => {
          console.log('Loading configuration failed because : ', reason);
        });


    // Promise.all([this.initSession(), this.initPortConfiguration(), this.initKeyboard()])
    //        .then(() => {
    //
    //          this.progressMessage = 'DONE';
    //          // If all succeeds, goto Lobby
    //          setTimeout(() => {
    //            this.router.navigate(['/setup']);
    //          }, 1000);
    //        }, (reason: string) => {
    //          console.error(reason);
    //        });


  }

}
