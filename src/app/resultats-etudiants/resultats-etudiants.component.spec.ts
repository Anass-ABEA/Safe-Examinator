import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatsEtudiantsComponent } from './resultats-etudiants.component';

describe('ResultatsEtudiantsComponent', () => {
  let component: ResultatsEtudiantsComponent;
  let fixture: ComponentFixture<ResultatsEtudiantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultatsEtudiantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatsEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
