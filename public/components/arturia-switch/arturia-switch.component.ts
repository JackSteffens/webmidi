import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arturia-switch',
  templateUrl: './arturia-switch.component.html',
  styleUrls: ['./arturia-switch.component.scss']
})
export class ArturiaSwitchComponent implements OnInit {
  @Input()
  public top: boolean = true;

  constructor() {
  }

  public toggleSwitch(): void {
    this.top = !this.top;
  }

  ngOnInit() {
  }

}
