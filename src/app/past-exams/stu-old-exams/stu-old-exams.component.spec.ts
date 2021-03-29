import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuOldExamsComponent } from './stu-old-exams.component';

describe('StuOldExamsComponent', () => {
  let component: StuOldExamsComponent;
  let fixture: ComponentFixture<StuOldExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuOldExamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuOldExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
