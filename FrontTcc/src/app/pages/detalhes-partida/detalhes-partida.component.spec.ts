import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPartidaComponent } from './detalhes-partida.component';

describe('DetalhesPartidaComponent', () => {
  let component: DetalhesPartidaComponent;
  let fixture: ComponentFixture<DetalhesPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesPartidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
