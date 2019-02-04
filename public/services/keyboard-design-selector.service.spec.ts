import { TestBed } from '@angular/core/testing';

import { KeyboardDesignSelectorService } from './keyboard-design-selector.service';

describe('KeyboardDesignSelectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeyboardDesignSelectorService = TestBed.get(KeyboardDesignSelectorService);
    expect(service).toBeTruthy();
  });
});
