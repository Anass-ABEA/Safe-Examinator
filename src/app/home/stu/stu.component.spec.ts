import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuComponent } from './stu.component';

describe('StuComponent', () => {
  let component: StuComponent;
  let fixture: ComponentFixture<StuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
