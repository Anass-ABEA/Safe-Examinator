import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectExamComponent } from './correct-exam.component';

describe('CorrectExamComponent', () => {
  let component: CorrectExamComponent;
  let fixture: ComponentFixture<CorrectExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
