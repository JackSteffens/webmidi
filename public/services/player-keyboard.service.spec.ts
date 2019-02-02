import { TestBed } from '@angular/core/testing';

import { PlayerKeyboardService } from './player-keyboard.service';

describe('PlayerKeyboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerKeyboardService = TestBed.get(PlayerKeyboardService);
    expect(service).toBeTruthy();
  });
});
