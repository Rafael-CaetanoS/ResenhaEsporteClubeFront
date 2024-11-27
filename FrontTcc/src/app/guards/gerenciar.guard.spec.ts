import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gerenciarGuard } from './gerenciar.guard';

describe('gerenciarGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gerenciarGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
