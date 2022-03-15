import { Injectable } from '@angular/core';
import { SubsonicService } from './subsonic.service';

import { Song } from '../models/song';
import { Playlist } from '../models/playlist';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class AudioService {

  public audioBoi;
  public audioBoiInfo: Song = {
    artist: "-",
    album: "-",
    title: "-",
    songId: 0,
    duration: 0
  };

  private emitChangeSource = new Subject<any>();

  public nowPlayingList: Playlist[] = [];

  changeEmitted$ = this.emitChangeSource.asObservable();

  constructor(private subsonicService: SubsonicService) {

    this.audioBoi = new Audio();

  }

  async setAudioBoi(songUri: string) {
    this.audioBoi.src = songUri;
  }


  async playAudioBoi(songId: number) {

    this.audioBoi.src = await this.subsonicService.getStream(songId);
    //this.audioBoiInfo = await this.subsonicService.getSongInfo(songId);

    //this.audioBoi.play();
    // Observable string streams

    //changeEmitted$ = this.emitChangeSource.asObservable();
   this.emitChange(this.audioBoi.src);

  }

  emitChange(change: any) {
    this.emitChangeSource.next(change);
}

  async continueAudioBoi() {
    this.audioBoi.play();
  }

  async pauseAudioBoi() {
    this.audioBoi.pause();
  }


  async getAudioBoiInfo() {
    return this.audioBoiInfo;
  }

  async addNowPlaying(songId: number) {
    let addedSongInfo = await this.subsonicService.getSongInfo(songId);
    let tempPlaylistItem: Playlist = {
      artist: addedSongInfo.artist,
      album: addedSongInfo.album,
      title: addedSongInfo.title,
      songId: songId
    }

    this.nowPlayingList.push(tempPlaylistItem);

  }


  public getStudents(): any {
    const studentsObservable = new Observable(observer => {
      observer.next(this.audioBoi.ended);
    });

    return studentsObservable;
  }


  public fromEvent() {
    return new Observable((observer) => {
      const handler = (e) => observer.next(e);

      this.audioBoi.addEventListener("ended", handler);
      
    });
  }

  public currentTimreLocation() {
    return new Observable((observer) => {
      const handler = (e) => observer.next(this.audioBoi.currentTime);
      this.audioBoi.addEventListener("timeupdate", handler);
    });
  }

  public isPaused(){
    if (this.audioBoi.paused || this.audioBoi.paused == null ){
      return true;
    }else{
      return false;
    }
  }

  public setSeek(seconds: any) {
    this.audioBoi.currentTime = seconds;
  }



}
