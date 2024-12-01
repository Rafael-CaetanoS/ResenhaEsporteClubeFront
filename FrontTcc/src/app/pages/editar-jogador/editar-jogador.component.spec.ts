import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarJogadorComponent } from './editar-jogador.component';

describe('EditarJogadorComponent', () => {
  let component: EditarJogadorComponent;
  let fixture: ComponentFixture<EditarJogadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarJogadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarJogadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
