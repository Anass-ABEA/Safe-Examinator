import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProExamOldComponent } from './pro-exam-old.component';

describe('ProExamOldComponent', () => {
  let component: ProExamOldComponent;
  let fixture: ComponentFixture<ProExamOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProExamOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProExamOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
