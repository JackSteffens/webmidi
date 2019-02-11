import { Component, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { KeyboardDesign } from '../../models/keyboard-design';
import { KeyboardDesignDirective } from '../../directives/keyboard-design.directive';
import { AbstractKeyboardDesign } from '../../models/abstract-keyboard-design';
import { KeyboardConfig } from '../../models/keyboard-config';

@Component({
  selector: 'app-design-preview',
  templateUrl: './design-preview.component.html',
  styleUrls: ['./design-preview.component.scss']
})
export class DesignPreviewComponent implements OnInit, OnChanges {
  @Input()
  keyboardDesign: KeyboardDesign;
  @ViewChild(KeyboardDesignDirective)
  keyboardDesignHost: KeyboardDesignDirective;
  mockKeyboardConfig: KeyboardConfig;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.mockKeyboardConfig = new KeyboardConfig(null, null, []);

    if (this.keyboardDesign && this.keyboardDesign.designComponent) {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.keyboardDesign.designComponent);

      let viewContainerRef = this.keyboardDesignHost.viewContainerRef;
      viewContainerRef.clear();

      let componentRef = viewContainerRef.createComponent(componentFactory);
      (<AbstractKeyboardDesign>componentRef.instance).keyboardConfig = this.mockKeyboardConfig;
    } else {
      throw Error('KeyboardDesign required');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
