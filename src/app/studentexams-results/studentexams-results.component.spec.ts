import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentexamsResultsComponent } from './studentexams-results.component';

describe('StudentexamsResultsComponent', () => {
  let component: StudentexamsResultsComponent;
  let fixture: ComponentFixture<StudentexamsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentexamsResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentexamsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
