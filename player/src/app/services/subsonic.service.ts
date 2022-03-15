import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Song } from '../models/song';


@Injectable({
	providedIn: 'root'
})
export class SubsonicService {

	public audioBoiInfo: Song;

	private userName: string = `apptesting`;
	private password: string = `Ckoch198811!`;
	private apiVersion: string = `1.12.0`;
	private appName: string = `MPlayer`;
	private dataFormat: string = `json`;
	private connectionAuth: string = `?u=${this.userName}&p=${this.password}&v=${this.apiVersion}&c=${this.appName}&f=${this.dataFormat}`;
	

	/* Can be changed to your local instance or left for now till setting are added. */
	private baseUrl: string = `http://localhost:4040/rest/`;
	//private baseUrl: string = `http://xxx.subsonic.org/rest/`;
	///private baseUrl: string = `http://xxx.subsonic.org/rest/`;
	//private baseUrl: string = `http://192.168.1.146:4040/rest/`;

	/* Might not need leave for now incase we offer other services. */
	//private jsonHeader: string = { headers: { 'Content-Type': 'application/json' } };


	private randomPlaylist: Song[];


	constructor(private http: HttpClient) { }

	
	async scanLibraries(): Promise<any>
	{
		let apiURL = this.baseUrl.concat(`startScan`, this.connectionAuth);
		return await this.http.get(apiURL).toPromise().then(
			res => {
				return res["subsonic-response"];
			},
			msg => {
				return msg
			}
		);
	}

	async getIndexes(musicFolderId: string): Promise<any> {
		let apiURL = this.baseUrl.concat(`getIndexes`, this.connectionAuth);
		return await this.http.get(apiURL).toPromise().then(
			res => {
				return res["subsonic-response"].indexes.index;
			},
			msg => {
				return msg
			}
		);
	}

	async getArtists(musicFolderId: string): Promise<any> {
		let apiURL = this.baseUrl.concat(`getArtists`, this.connectionAuth);
		return await this.http.get(apiURL).toPromise().then(
			res => {
				return res["subsonic-response"].artists.index;
			},
			msg => {
				return msg
			}
		);
	}

	async getArtist(artistId: number): Promise<any> {
		let apiURL = this.baseUrl.concat(`getArtist`, this.connectionAuth,`&id=${artistId}`);
		return await this.http.get(apiURL).toPromise().then(
			res => {
				return res["subsonic-response"].artist;
			},
			msg => {
				return msg
			}
		);
	}

	async getAlbum(albumId: number): Promise<any> {
		let apiURL = this.baseUrl.concat(`getAlbum`, this.connectionAuth,`&id=${albumId}`);
		return await this.http.get(apiURL).toPromise().then(
			res => {
				return res["subsonic-response"].album;
			},
			msg => {
				return msg
			}
		);
	}

	
	async getCoverArt(songId: number) {
		let apiURL = this.baseUrl.concat(`getCoverArt`, this.connectionAuth, `&id=${songId}`);
		
		return await this.http.get(apiURL, {responseType:'blob'}).toPromise().then(
			res => {
				return res
			},
			msg => {
				return msg
			}
		);
	}

	async getAlbumInfo(songId: number) {
		let apiURL = this.baseUrl.concat(`getAlbumInfo`, this.connectionAuth, `&id=${songId}`);
		
		return await this.http.get(apiURL, {responseType:'json'}).toPromise().then(
			res => {
				return res["subsonic-response"].albumInfo;
			},
			msg => {
				return msg
			}
		);
	}

	async getMusicDirectory(musicDirectoryId: string) {
		let apiURL = this.baseUrl.concat(`getMusicDirectory`, this.connectionAuth, `&id=${musicDirectoryId}`);

	}

	async getStream( songId: number ) {
		let apiURL = this.baseUrl.concat(`stream`, this.connectionAuth, `&id=${songId}`);
		return apiURL;
	}

	async getSongInfo(songId: number) {
		let apiURL = this.baseUrl.concat(`getSong`, this.connectionAuth, `&id=${songId}`);
		return await this.http.get(apiURL).toPromise().then(
			res => {
				let songInfo: Song = {
					album: res["subsonic-response"].song.album,
					artist: res["subsonic-response"].song.artist,
					title: res["subsonic-response"].song.title,
					songId: res["subsonic-response"].song.id,
					duration: res["subsonic-response"].song.duration
				};

				return songInfo;
			},
			msg => {
				return msg
			}
		);
	}

	async getRandomSongList(listSize: number) {
		let apiURL = this.baseUrl.concat(`getRandomSongs`, this.connectionAuth, `&size=${listSize}`);
		return await this.http.get(apiURL).toPromise().then(
			res => {
				this.randomPlaylist = [];

				res["subsonic-response"].randomSongs.song.forEach(song => {
					let songInfo: Song = {
						album: song.album,
						artist: song.artist,
						title: song.title,
						songId: song.id,
						duration: song.duration
					};
					this.randomPlaylist.push( songInfo );
				});

				return this.randomPlaylist;
			},
			msg => {
				return msg
			}
		);
	}

}