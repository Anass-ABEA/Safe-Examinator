import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgProComponent } from './prog-pro.component';

describe('ProgProComponent', () => {
  let component: ProgProComponent;
  let fixture: ComponentFixture<ProgProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
