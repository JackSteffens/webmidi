import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArturiaSwitchComponent } from './arturia-switch.component';

describe('ArturiaSwitchComponent', () => {
  let component: ArturiaSwitchComponent;
  let fixture: ComponentFixture<ArturiaSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArturiaSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArturiaSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
