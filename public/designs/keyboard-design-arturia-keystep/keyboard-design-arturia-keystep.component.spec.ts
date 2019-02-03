import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardDesignArturiaKeystepComponent } from './keyboard-design-arturia-keystep.component';

describe('KeyboardDesignArturiaKeystepComponent', () => {
  let component: KeyboardDesignArturiaKeystepComponent;
  let fixture: ComponentFixture<KeyboardDesignArturiaKeystepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyboardDesignArturiaKeystepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardDesignArturiaKeystepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
