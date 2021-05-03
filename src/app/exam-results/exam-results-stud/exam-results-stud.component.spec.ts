import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamResultsStudComponent } from './exam-results-stud.component';

describe('ExamResultsStudComponent', () => {
  let component: ExamResultsStudComponent;
  let fixture: ComponentFixture<ExamResultsStudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamResultsStudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamResultsStudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
