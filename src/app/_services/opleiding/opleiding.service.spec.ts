import { TestBed } from '@angular/core/testing';

import { OpleidingService } from './opleiding.service';

describe('OpleidingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpleidingService = TestBed.get(OpleidingService);
    expect(service).toBeTruthy();
  });
});
