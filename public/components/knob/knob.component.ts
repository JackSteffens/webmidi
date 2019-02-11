import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.scss']
})
export class KnobComponent implements OnInit, AfterViewInit {
  @Input()
  rotation: number = 0;
  public transformRotate: string = '0deg';
  @ViewChild('svg')
  svgElement: ElementRef;

  constructor() {
  }

  ngOnInit() {
    this.transformRotate = (this.rotation || 0) + 'deg';
  }

  ngAfterViewInit(): void {
    let g: HTMLElement = this.svgElement.nativeElement.childNodes[0];
    g.style.transform = `rotate(${this.transformRotate})`;
  }

}
