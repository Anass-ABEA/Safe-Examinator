import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuProfessorComponent } from './stu-professor.component';

describe('StuProfessorComponent', () => {
  let component: StuProfessorComponent;
  let fixture: ComponentFixture<StuProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuProfessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
