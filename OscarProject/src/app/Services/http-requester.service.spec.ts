import { TestBed } from '@angular/core/testing';

import { HttpRequesterService } from './http-requester.service';

describe('HttpRequesterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpRequesterService = TestBed.get(HttpRequesterService);
    expect(service).toBeTruthy();
  });
});
