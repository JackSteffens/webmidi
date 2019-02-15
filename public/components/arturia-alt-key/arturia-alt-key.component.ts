import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arturia-alt-key',
  templateUrl: './arturia-alt-key.component.html',
  styleUrls: ['./arturia-alt-key.component.scss']
})
export class ArturiaAltKeyComponent implements OnInit {
  @Input()
  public on: boolean = false;
  @Input('class')
  public classAttribute: string = '';

  constructor() {
  }

  public toggleOn(): void {
    this.on = !this.on;
  }

  ngOnInit() {
  }

}
