import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

import { SocketService } from '../services/socket.service';
import { SubsonicService } from '../services/subsonic.service';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';


import { AudioService } from '../services/audio.service';
import { Song } from '../models/song';

import * as moment from 'moment';


import {
	faStepBackward,
	faStepForward,
	faPlay,
	faPause,
	faBars,
	faSearch,
	faHeart,
	faRandom,
	faUndo,
	faEllipsisH
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {

  	musicIndex: any[] = [];
	
	alphaArtists: any[] = [];
	artistLibrary: any = {};
	artistAlbum: any = {};

	currentSong: Song = new Song;
	currentTimeLocation: number = 0;
	currentAlbumCover: any = "/assets/images/default_album_art.png";
	songDuration: number = 0;
	

	selectedTab;

	musicObject: any[] = [];
	localplayer;

	faStepBackward = faStepBackward;
	faStepForward = faStepForward;
	faPlay = faPlay;
	faPause = faPause;
	faBars = faBars;
	faSearch = faSearch;
	faHeart = faHeart;
	faRandom = faRandom;
	faUndo = faUndo;
	faEllipsisH = faEllipsisH;

	musicURL;

	tempPlaylist: Song[];
	tempPlaylistPosition: number;
	
	
	min = 0;
  
  	step = 0.01;
  	thumbLabel = true;
	value = 0;
	disabled = false;

	/* So this guy is the communication service for Light Caster (working title)
		private socketService: SocketService,
	*/

	constructor(private subsonicService: SubsonicService, public audioX: AudioService)
	{

	}

	ngOnInit()
	{
		const songEndedSubscription = this.audioX.fromEvent()
			.subscribe((e: any) => {
				this.nextSong();
			});

		const CurrentTimeSubscription = this.audioX.currentTimreLocation()
			.subscribe((e: any) => {
				this.currentTimeLocation = e;
			});

		this.tempPlaylist = [
			{
				artist: "Incubus",
				album:  "Light Grenades",
				title: "Quicksand",
				songId: 229,
				duration: 132
			},
			{
				artist: "Incubus",
				album:  "Light Grenades",
				title: "Anna Molly",
				songId: 219,
				duration: 208
			},
			{
				artist: "Incubus",
				album:  "Light Grenades",
				title: "Light Grenades",
				songId: 224,
				duration: 132
			}
		];

		if( this.tempPlaylist.length > 0 ){
			this.tempPlaylistPosition = 0;
			this.currentSong = this.tempPlaylist[ this.tempPlaylistPosition ];
			this.getStreamUrl(this.currentSong.songId);
			this.songDuration = this.currentSong.duration;
		}

		this.currentTimeLocation = 0;
	}
	
  public formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
		var sign = value < 0 ? "-" : "";
		var min = Math.floor(Math.abs(value/60));
		var sec = Math.floor((Math.abs(value) ) % 60);
		return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
  }

	test(e){
		this.audioX.setSeek(e.value);
	}

	async getStreamUrl( songId: number ){
		let streamUrl: string;
		await this.subsonicService.getStream(songId).then(data => {
			streamUrl = data;
		});
		this.setSong( streamUrl );
	}

	async setSong( streamUrl: string ){
		await this.audioX.setAudioBoi( streamUrl ).then(data=> {
			//something something... something...
		});
	}

	async randomPlaylist(  ){

		this.tempPlaylist = [];

		await this.subsonicService.getRandomSongList(25).then(data => {
			this.tempPlaylist = data;
			this.tempPlaylistPosition = 0;
			

			this.currentSong = this.tempPlaylist[ this.tempPlaylistPosition ];
			
			this.playSetUp();

			/*
			this.currentTimeLocation = 0;
			this.getCoverArt( this.currentSong.songId, true );
			this.audioX.playAudioBoi(this.currentSong.songId);
			*/
			
		});
	}


	 audioToggle()
	{
		 if (this.audioX.isPaused())
		{
			if( this.currentTimeLocation > 0 ){
				this.audioX.continueAudioBoi();
			}else{

				/*
				this.getCoverArt( this.currentSong.songId, true );
				this.audioX.playAudioBoi(this.currentSong.songId);
				*/

				this.playSetUp();
			}
		}else{
			this.audioX.pauseAudioBoi();
		}
	}

	getCoverArt(songId: number, useLastFm: boolean) {
		if(useLastFm){
			this.subsonicService.getAlbumInfo(songId).then(
				data => {
					if( data.largeImageUrl.length == 0 ){
						this.currentAlbumCover = "/assets/images/default_album_art.png";
					}else{
						this.currentAlbumCover = data.largeImageUrl;
					}
				}
			);
		}else{
			this.subsonicService.getCoverArt(songId).then(
				data => {
					this.createImageFromBlob(data);
				}
			);
		}
	}

	createImageFromBlob(image: any) {
		let reader = new FileReader();
		reader.addEventListener("load", () => {
		   this.currentAlbumCover = reader.result;
		}, false);
	 
		if (image) {
		   reader.readAsDataURL(image);
		}
	 }

	nextSong(){
		if( this.tempPlaylistPosition !== (this.tempPlaylist.length -1)  ){
			this.tempPlaylistPosition++;
			this.currentSong = this.tempPlaylist[this.tempPlaylistPosition];
			
			this.playSetUp();
		}

	}

	previousSong(){
		if( this.tempPlaylistPosition !== 0  ){
			this.tempPlaylistPosition--;
			this.currentSong = this.tempPlaylist[this.tempPlaylistPosition];
			
			this.playSetUp();
		}
	}

	playSetUp(){
		this.currentTimeLocation = 0;
		this.getCoverArt( this.currentSong.songId, true );
		this.audioX.playAudioBoi(this.currentSong.songId);
	}

	isNotEmptyArray( array : any ){
		if (array && array.length) {   
			return true;
		 } else {
			return false;
		 }
	}

	isNotEmptyObject( obj : any ){
		if (Object.keys(obj).length === 0 && obj.constructor === Object) {   
			return false;
		 } else {
			return true;
		 }
	}

	
}