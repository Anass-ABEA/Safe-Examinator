import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressExamComponent } from './in-progress-exam.component';

describe('InProgressExamComponent', () => {
  let component: InProgressExamComponent;
  let fixture: ComponentFixture<InProgressExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InProgressExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InProgressExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
