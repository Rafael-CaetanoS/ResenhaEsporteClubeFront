import { TestBed } from '@angular/core/testing';

import { EsportesService } from './esportes.service';

describe('EsportesService', () => {
  let service: EsportesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsportesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
