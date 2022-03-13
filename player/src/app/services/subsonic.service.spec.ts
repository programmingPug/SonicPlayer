import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

import { SubsonicService } from './subsonic.service';

describe('SubsonicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [SubsonicService]
    });
  });

  it('should be created', inject([SubsonicService], (service: SubsonicService) => {
    expect(service).toBeTruthy();
  }));
});
