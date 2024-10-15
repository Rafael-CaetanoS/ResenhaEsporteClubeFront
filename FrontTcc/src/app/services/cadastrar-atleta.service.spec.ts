import { TestBed } from '@angular/core/testing';

import { CadastrarAtletaService } from './cadastrar-atleta.service';

describe('CadastrarAtletaService', () => {
  let service: CadastrarAtletaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastrarAtletaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
