import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { PlayerComponent } from './player/player.component';
import { LibraryComponent } from './library/library.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistComponent } from './playlist/playlist.component';

 
const routes: Routes = [
  { path: '', redirectTo: '/player', pathMatch: 'full' },
  { path: 'player', component: PlayerComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'playlists', component: PlaylistsComponent },
  { path: 'playlist', component: PlaylistComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}