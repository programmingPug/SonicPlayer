import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  playlistDetails = {};
  

  constructor() { }

  ngOnInit() {

    var nowPlaylist = localStorage.getItem('nowPlaylist');
    let testList = [99,91,94,96,96];
  }

  buildPlaylistDetails( playlistId: number ){

  }

}
