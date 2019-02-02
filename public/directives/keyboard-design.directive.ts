import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appKeyboardDesignHost]'
})
export class KeyboardDesignDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
