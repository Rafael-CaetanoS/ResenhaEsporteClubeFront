import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBuscarPartidaComponent } from './card-buscar-partida.component';

describe('CardBuscarPartidaComponent', () => {
  let component: CardBuscarPartidaComponent;
  let fixture: ComponentFixture<CardBuscarPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBuscarPartidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardBuscarPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
