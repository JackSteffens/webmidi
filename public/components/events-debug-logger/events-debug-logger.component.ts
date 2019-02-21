import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MIDIMessageActionPayload } from '../../actions/midi-message.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events-debug-logger',
  templateUrl: './events-debug-logger.component.html',
  styleUrls: ['./events-debug-logger.component.scss']
})
export class EventsDebugLoggerComponent implements OnInit {
  public isHidden: boolean = true;
  @ViewChild('host')
  private elementReference: ElementRef;
  private dragDeltaX = 0;
  private dragDeltaY = 0;
  private emptyElement = document.createElement('div');
  private midiEventObservable: Observable<MIDIMessageActionPayload>;
  public midiEvents: Array<MIDIMessageActionPayload> = [];

  constructor(private renderer: Renderer2, private store: Store<MIDIMessageActionPayload>) {
    this.midiEventObservable = store.pipe(select('MIDIMessage'));
  }

  ngOnInit() {
    this.midiEventObservable.subscribe((midiMessage: MIDIMessageActionPayload) => {
      this.midiEvents.push(midiMessage);
    });
  }

  public toggleConsole() {
    this.isHidden = !this.isHidden;
  }

  public onHeaderDragStart(event: DragEvent) {
    this.dragDeltaX = event.screenX - this.elementReference.nativeElement.offsetLeft;
    this.dragDeltaY = event.screenY - this.elementReference.nativeElement.offsetTop;
    event.dataTransfer.setDragImage(this.emptyElement, 0, 0);
  }

  public onHeaderDrag(event: DragEvent) {
    event.preventDefault();
    if (!(event.pageX === 0 && event.pageY === 0)) {
      let posX = event.screenX - this.dragDeltaX;
      let posY = event.screenY - this.dragDeltaY;
      if (posY > 10 && posY < (window.innerHeight - 55)) {
        this.renderer.setStyle(this.elementReference.nativeElement, 'top', posY + 'px');
      }

      if (posX > 10 && posX < (window.innerWidth - 10 - this.elementReference.nativeElement.clientWidth)) {
        this.renderer.setStyle(this.elementReference.nativeElement, 'left', posX + 'px');
      }
    }

  }

}
