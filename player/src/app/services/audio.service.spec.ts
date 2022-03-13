import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

import { AudioService } from './audio.service';

describe('AudioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [AudioService]
    });
  });

  it('should be created', inject([AudioService], (service: AudioService) => {
    expect(service).toBeTruthy();
  }));

});
