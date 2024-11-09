import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacarComponent } from './placar.component';

describe('PlacarComponent', () => {
  let component: PlacarComponent;
  let fixture: ComponentFixture<PlacarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlacarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
