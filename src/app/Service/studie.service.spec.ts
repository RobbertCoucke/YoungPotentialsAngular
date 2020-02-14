import { TestBed } from '@angular/core/testing';

import { StudieService } from './studie.service';

describe('StudieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudieService = TestBed.get(StudieService);
    expect(service).toBeTruthy();
  });
});
