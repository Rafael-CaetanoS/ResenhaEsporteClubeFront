import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { inscritoGuard } from './inscrito.guard';

describe('inscritoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => inscritoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
