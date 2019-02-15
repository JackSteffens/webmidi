import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArturiaMediaKeyComponent } from './arturia-media-key.component';

describe('ArturiaMediaKeyComponent', () => {
  let component: ArturiaMediaKeyComponent;
  let fixture: ComponentFixture<ArturiaMediaKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArturiaMediaKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArturiaMediaKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
