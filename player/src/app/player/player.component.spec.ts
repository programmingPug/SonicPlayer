import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

import { SubsonicService } from '../services/subsonic.service';
import { AudioService } from '../services/audio.service';


import { PlayerComponent } from './player.component';


describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ PlayerComponent ],
      imports: [
        MatMenuModule,
        FontAwesomeModule,
        MatToolbarModule,
        MatSliderModule,
        HttpClientTestingModule
      ],
      providers: [
        SubsonicService,
        AudioService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;

    

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be playing a song', () => {
    
    let songUri = component.getStreamUrl(220);
    
    expect(component).toBeTruthy();
  });



});
