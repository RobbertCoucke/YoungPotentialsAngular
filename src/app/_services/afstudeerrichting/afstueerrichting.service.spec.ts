import { TestBed } from '@angular/core/testing';

import { AfstueerrichtingService } from './afstueerrichting.service';

describe('AfstueerrichtingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AfstueerrichtingService = TestBed.get(AfstueerrichtingService);
    expect(service).toBeTruthy();
  });
});
