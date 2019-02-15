import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArturiaAltKeyComponent } from './arturia-alt-key.component';

describe('ArturiaAltKeyComponent', () => {
  let component: ArturiaAltKeyComponent;
  let fixture: ComponentFixture<ArturiaAltKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArturiaAltKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArturiaAltKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
