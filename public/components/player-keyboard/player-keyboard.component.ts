import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {KeyboardConfig} from '../../models/keyboard-config';
import {KeyboardDesignDirective} from '../../directives/keyboard-design.directive';
import {KeyboardDesign} from '../../models/keyboard-design';
import {PlayerKeyboardService} from '../../services/player-keyboard.service';
import {AbstractKeyboardDesign} from '../../models/abstract-keyboard-design';

@Component({
  selector: 'app-player-keyboard',
  templateUrl: './player-keyboard.component.html',
  styleUrls: ['./player-keyboard.component.scss']
})
export class PlayerKeyboardComponent implements OnInit {
  keyboardModel: KeyboardConfig;
  @ViewChild(KeyboardDesignDirective, {static: true})
  keyboardDesignHost: KeyboardDesignDirective;

  constructor(private playerKeyboardService: PlayerKeyboardService, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  listenOnPortChanges(): void {
    this.playerKeyboardService.inputObservable.subscribe((input) => {
      if (this.keyboardModel) {
        this.keyboardModel.input = input;
      }
    });

    this.playerKeyboardService.outputObservable.subscribe((output) => {
      if (this.keyboardModel) {
        this.keyboardModel.output = output;
      }
    });
  }

  listenOnKeyboardDesignChanges(): void {
    this.playerKeyboardService.playerKeyboardDesignObservable.subscribe((keyboardDesign: KeyboardDesign) => {
      if (keyboardDesign && keyboardDesign.designComponent) {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(keyboardDesign.designComponent);

        let viewContainerRef = this.keyboardDesignHost.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<AbstractKeyboardDesign>componentRef.instance).keyboardConfig = keyboardDesign.keyboardConfig;
      } else {
        console.debug('Trying to set a KeyboardDesign for PlayerKeyboardComponent but no keyboard design was set in the PlayerKeyBoardService');
      }
    });
  }

  ngOnInit() {
    this.listenOnPortChanges();
    this.listenOnKeyboardDesignChanges();
  }

}
