import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPartidaComponent } from './criar-partida.component';

describe('CriarPartidaComponent', () => {
  let component: CriarPartidaComponent;
  let fixture: ComponentFixture<CriarPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarPartidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
