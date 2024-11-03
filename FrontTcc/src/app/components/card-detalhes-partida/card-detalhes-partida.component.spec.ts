import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetalhesPartidaComponent } from './card-detalhes-partida.component';

describe('CardDetalhesPartidaComponent', () => {
  let component: CardDetalhesPartidaComponent;
  let fixture: ComponentFixture<CardDetalhesPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDetalhesPartidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDetalhesPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
