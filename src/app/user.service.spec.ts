import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule
  // Configurations
    ],
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
