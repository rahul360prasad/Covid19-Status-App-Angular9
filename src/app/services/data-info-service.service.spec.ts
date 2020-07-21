import { TestBed } from '@angular/core/testing';

import { DataInfoServiceService } from './data-info-service.service';

describe('DataInfoServiceService', () => {
  let service: DataInfoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataInfoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
