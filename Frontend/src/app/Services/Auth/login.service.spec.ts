import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../ToastService/toast.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
