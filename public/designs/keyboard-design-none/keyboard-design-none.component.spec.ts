import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardDesignNoneComponent } from './keyboard-design-none.component';

describe('KeyboardDesignNoneComponent', () => {
  let component: KeyboardDesignNoneComponent;
  let fixture: ComponentFixture<KeyboardDesignNoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyboardDesignNoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardDesignNoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
