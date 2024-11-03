import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVizualizarPartidaComponent } from './card-vizualizar-partida.component';

describe('CardVizualizarPartidaComponent', () => {
  let component: CardVizualizarPartidaComponent;
  let fixture: ComponentFixture<CardVizualizarPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardVizualizarPartidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardVizualizarPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
