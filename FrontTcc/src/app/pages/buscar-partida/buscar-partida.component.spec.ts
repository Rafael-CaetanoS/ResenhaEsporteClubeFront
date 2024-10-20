import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPartidaComponent } from './buscar-partida.component';

describe('BuscarPartidaComponent', () => {
  let component: BuscarPartidaComponent;
  let fixture: ComponentFixture<BuscarPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarPartidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
