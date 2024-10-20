import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizarPartidasComponent } from './vizualizar-partidas.component';

describe('VizualizarPartidasComponent', () => {
  let component: VizualizarPartidasComponent;
  let fixture: ComponentFixture<VizualizarPartidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VizualizarPartidasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VizualizarPartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
