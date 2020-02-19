import { TestBed } from '@angular/core/testing';

import { StudiegebiedService } from './studiegebied.service';

describe('StudiegebiedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudiegebiedService = TestBed.get(StudiegebiedService);
    expect(service).toBeTruthy();
  });
});
