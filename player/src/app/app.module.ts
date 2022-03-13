import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatSliderModule} from '@angular/material/slider'; 

import { SocketService } from './services/socket.service';
import { SubsonicService } from './services/subsonic.service';
import { AudioService } from './services/audio.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { AppComponent } from './app.component';
import { LibraryComponent } from './library/library.component';
import { AppRoutingModule } from './app-routing.module';
import { PlayerComponent } from './player/player.component';
import { HeaderComponent } from './header/header.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistComponent } from './playlist/playlist.component';



@NgModule({
	declarations: [
		AppComponent,
		LibraryComponent,
		PlayerComponent,
		HeaderComponent,
		PlaylistsComponent,
		PlaylistComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FontAwesomeModule,
		BrowserAnimationsModule,
		MatTabsModule,
		MatMenuModule,
		MatInputModule,
		MatExpansionModule,
		MatToolbarModule,
		AppRoutingModule,
		MatDividerModule,
		MatSliderModule
	],
	providers: [SocketService, SubsonicService, AudioService],
	bootstrap: [AppComponent]
})
export class AppModule { }
