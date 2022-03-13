export class Song {
	title: string;
	album: string;
	artist: string;
	songId: number;
	duration: number;

	constructor()
	{
		this.artist = "";
		this.album = "";
		this.title = "";
		this.songId = 0
		this.duration = 0;
	}

}