import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProOldExamsComponent } from './pro-old-exams.component';

describe('ProOldExamsComponent', () => {
  let component: ProOldExamsComponent;
  let fixture: ComponentFixture<ProOldExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProOldExamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProOldExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
