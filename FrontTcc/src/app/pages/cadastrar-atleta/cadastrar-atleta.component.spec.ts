import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAtletaComponent } from './cadastrar-atleta.component';

describe('CadastrarAtletaComponent', () => {
  let component: CadastrarAtletaComponent;
  let fixture: ComponentFixture<CadastrarAtletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarAtletaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrarAtletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
