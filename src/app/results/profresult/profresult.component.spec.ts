import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfresultComponent } from './profresult.component';

describe('ProfresultComponent', () => {
  let component: ProfresultComponent;
  let fixture: ComponentFixture<ProfresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfresultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
