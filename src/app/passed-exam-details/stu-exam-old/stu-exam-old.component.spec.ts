import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuExamOldComponent } from './stu-exam-old.component';

describe('StuExamOldComponent', () => {
  let component: StuExamOldComponent;
  let fixture: ComponentFixture<StuExamOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuExamOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuExamOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
