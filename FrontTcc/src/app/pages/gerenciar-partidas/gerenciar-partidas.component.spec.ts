import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarPartidasComponent } from './gerenciar-partidas.component';

describe('GerenciarPartidasComponent', () => {
  let component: GerenciarPartidasComponent;
  let fixture: ComponentFixture<GerenciarPartidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarPartidasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerenciarPartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
