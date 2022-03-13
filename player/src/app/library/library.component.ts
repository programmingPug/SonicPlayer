import { Component, OnInit } from '@angular/core';

import { SubsonicService } from '../services/subsonic.service';
import { AudioService } from '../services/audio.service';

import {
	faEllipsisH
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  faEllipsisH = faEllipsisH;

  alphaArtists: any[] = [];
	artistLibrary: any = {};
	artistAlbum: any = {};

  constructor( private subsonicService: SubsonicService, private audioService: AudioService ) { }

  ngOnInit() {
    this.getArtists();
	}
	
	async playNow( songId: number ){
		this.audioService.playAudioBoi( songId );
	}

	async getArtists(){
		try{
			this.alphaArtists = await this.subsonicService.getArtists("s");
		}catch (error) {

		}
	}

	async getArtist( artistId : number  ){
		this.artistLibrary = [];
		try{
			this.artistLibrary = await this.subsonicService.getArtist( artistId );
		}catch (error) {

		}
	}

	async getAlbum( albumId : number  ){
		this.artistAlbum = [];
		try{
			this.artistAlbum = await this.subsonicService.getAlbum( albumId );
			console.log( this.artistAlbum );
		}catch (error) {
		}
	}
	
	async addNowPlaying( songId: number )
	{
		await this.audioService.addNowPlaying( songId );
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
