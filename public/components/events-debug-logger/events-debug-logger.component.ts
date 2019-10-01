import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {MIDIMessageActionPayload} from '../../actions/midi-message.action';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-events-debug-logger',
  templateUrl: './events-debug-logger.component.html',
  styleUrls: ['./events-debug-logger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsDebugLoggerComponent implements OnInit, OnDestroy {
  @ViewChild('host', {static: true})
  private elementReference: ElementRef;
  @ViewChild('scrollable', {static: true})
  private scrollableWrapperReference: ElementRef;
  private dragDeltaX = 0;
  private dragDeltaY = 0;
  private emptyElement = document.createElement('div');
  private midiEventObservable: Observable<MIDIMessageActionPayload>;
  private subscription: Subscription;

  public autoScroll: boolean = true;
  public isHidden: boolean = true;
  public midiEvents: Array<MIDIMessageActionPayload> = [];

  constructor(private renderer: Renderer2, private store: Store<MIDIMessageActionPayload>, private changeDetectorRef: ChangeDetectorRef) {
    this.midiEventObservable = store.pipe(select('MIDIMessage'));
  }

  ngOnInit() {
    this.subscription = this.midiEventObservable.subscribe((midiMessage: MIDIMessageActionPayload) => {
      this.midiEvents.push(midiMessage);
      this.changeDetectorRef.detectChanges();
      if (this.autoScroll) {
        this.scrollableWrapperReference.nativeElement.scrollTo(0, 0);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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

  public reset() {
    this.midiEvents = [this.midiEvents[this.midiEvents.length - 1]];
  }

  public getDateTimestamp(timestamp: DOMHighResTimeStamp): number {
    return new Date(performance.timeOrigin + timestamp).valueOf();
  }

}
