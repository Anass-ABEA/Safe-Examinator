import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamResultsProfComponent } from './exam-results-prof.component';

describe('ExamResultsProfComponent', () => {
  let component: ExamResultsProfComponent;
  let fixture: ComponentFixture<ExamResultsProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamResultsProfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamResultsProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
