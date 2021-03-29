import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassedExamDetailsComponent } from './passed-exam-details.component';

describe('PassedExamDetailsComponent', () => {
  let component: PassedExamDetailsComponent;
  let fixture: ComponentFixture<PassedExamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassedExamDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassedExamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
