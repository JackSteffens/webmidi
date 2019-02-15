import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.scss']
})
export class KnobComponent implements OnInit, AfterViewInit {
  @Input()
  rotation: number = 0;
  public transformRotate: string = '0deg';
  @ViewChild('rotatable')
  svgElement: ElementRef;

  constructor(private renderer: Renderer2) {
  }

  @HostListener('mousewheel', ['$event'])
  onScroll(event: WheelEvent): void {
    event.preventDefault();
    this.rotation = Number(this.rotation) + Number(event.deltaY);
    this.fixRotationLimits();
    this.rotate();
  }

  fixRotationLimits() {
    this.rotation = this.rotation > 360 ? this.rotation - 360 : this.rotation < 0 ? this.rotation + 360 : this.rotation;
  }

  rotate() {
    this.transformRotate = (this.rotation || 0) + 'deg';
    this.renderer.setStyle(this.svgElement.nativeElement, 'transform', `rotate(${this.transformRotate})`);
  }

  ngOnInit() {
    this.fixRotationLimits();
  }

  ngAfterViewInit(): void {
    this.rotate();
  }

}
