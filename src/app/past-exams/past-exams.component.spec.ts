import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastExamsComponent } from './past-exams.component';

describe('PastExamsComponent', () => {
  let component: PastExamsComponent;
  let fixture: ComponentFixture<PastExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastExamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
