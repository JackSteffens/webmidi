import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arturia-media-key',
  templateUrl: './arturia-media-key.component.html',
  styleUrls: ['./arturia-media-key.component.scss']
})
export class ArturiaMediaKeyComponent implements OnInit {
  @Input()
  public on: boolean = false;
  @Input('class')
  public classAttribute: string = '';

  constructor() {
  }

  toggleOn() {
    this.on = !this.on;
  }

  ngOnInit() {
  }

}
