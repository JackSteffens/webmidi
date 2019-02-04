import { Injectable, Type } from '@angular/core';
import { KeyboardDesign } from '../models/keyboard-design';
import { KeyboardDesignMinimalComponent } from '../designs/keyboard-design-minimal/keyboard-design-minimal.component';
import { KeyboardDesignArturiaKeystepComponent } from '../designs/keyboard-design-arturia-keystep/keyboard-design-arturia-keystep.component';
import { KeyboardConfig } from '../models/keyboard-config';

@Injectable({
  providedIn: 'root'
})
export class KeyboardDesignSelectorService {
  private designComponents: Array<Type<any>> = [
    KeyboardDesignMinimalComponent,
    KeyboardDesignArturiaKeystepComponent
  ];

  public getAvailableDesigns(keyboardConfig: KeyboardConfig): Map<string, KeyboardDesign> {
    let designs = new Map();
    this.designComponents.forEach((designComponent: any) => {
      let keyboardDesign = new KeyboardDesign(designComponent, keyboardConfig);
      designs.set(designComponent.designName, keyboardDesign);
    });
    return designs;
  }

  constructor() {
  }
}
