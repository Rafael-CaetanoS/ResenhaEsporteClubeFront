import { TestBed } from '@angular/core/testing';

import { GerenciarService } from './gerenciar.service';

describe('GerenciarService', () => {
  let service: GerenciarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenciarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
