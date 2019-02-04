import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardDesignMinimalComponent } from './keyboard-design-minimal.component';

describe('KeyboardDesignNoneComponent', () => {
  let component: KeyboardDesignMinimalComponent;
  let fixture: ComponentFixture<KeyboardDesignMinimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyboardDesignMinimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardDesignMinimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
