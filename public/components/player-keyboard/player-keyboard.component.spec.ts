import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerKeyboardComponent } from './player-keyboard.component';

describe('PlayerKeyboardComponent', () => {
  let component: PlayerKeyboardComponent;
  let fixture: ComponentFixture<PlayerKeyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerKeyboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
