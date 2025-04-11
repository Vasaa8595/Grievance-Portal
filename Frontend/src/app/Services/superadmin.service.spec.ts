import { TestBed } from '@angular/core/testing';

import { SuperadminService } from './superadmin.service';
import { HttpClient } from '@angular/common/http';

describe('SuperadminService', () => {
  let service: SuperadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClient]
    });
    service = TestBed.inject(SuperadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
