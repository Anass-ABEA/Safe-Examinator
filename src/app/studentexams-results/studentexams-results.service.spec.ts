import { TestBed } from '@angular/core/testing';

import { StudentexamsResultsService } from './studentexams-results.service';

describe('StudentexamsResultsService', () => {
  let service: StudentexamsResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentexamsResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
