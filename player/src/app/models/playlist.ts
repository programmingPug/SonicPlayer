export class Playlist {
	title: string;
	album: string;
	artist: string;
    songId: number;

	constructor()
	{
		this.artist = "";
		this.album = "";
		this.title = "";
        this.songId = 0;
	}
}