import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhaPartidasComponent } from './minhas-partidas.component';

describe('MinhaPartidasComponent', () => {
  let component: MinhaPartidasComponent;
  let fixture: ComponentFixture<MinhaPartidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhaPartidasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinhaPartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
