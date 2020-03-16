/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PagingService } from './paging.service';

describe('Service: Paging', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagingService]
    });
  });

  it('should ...', inject([PagingService], (service: PagingService) => {
    expect(service).toBeTruthy();
  }));
});
