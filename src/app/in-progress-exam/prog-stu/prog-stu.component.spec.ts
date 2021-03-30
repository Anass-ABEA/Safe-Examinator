import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgStuComponent } from './prog-stu.component';

describe('ProgStuComponent', () => {
  let component: ProgStuComponent;
  let fixture: ComponentFixture<ProgStuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgStuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgStuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
