import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDebugLoggerComponent } from './events-debug-logger.component';

describe('EventsDebugLoggerComponent', () => {
  let component: EventsDebugLoggerComponent;
  let fixture: ComponentFixture<EventsDebugLoggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsDebugLoggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsDebugLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
