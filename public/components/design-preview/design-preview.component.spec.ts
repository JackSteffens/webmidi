import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignPreviewComponent } from './design-preview.component';

describe('DesignPreviewComponent', () => {
  let component: DesignPreviewComponent;
  let fixture: ComponentFixture<DesignPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
