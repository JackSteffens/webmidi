import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardDesignSelectorComponent } from './keyboard-design-selector.component';

describe('KeyboardDesignSelectorComponent', () => {
  let component: KeyboardDesignSelectorComponent;
  let fixture: ComponentFixture<KeyboardDesignSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyboardDesignSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardDesignSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
