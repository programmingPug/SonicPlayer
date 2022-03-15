import { Component } from '@angular/core';
import { AudioService } from './services/audio.service';
import { SubsonicService } from './services/subsonic.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent
{
	public audioObject;


	constructor( private subsonicService: SubsonicService, private audioService: AudioService ) {
		this.audioObject = new Audio();

		audioService.changeEmitted$.subscribe(text => {
            this.audioObject.src = text;
			console.log(this.audioObject.src)
			this.audioObject.play();
        });
		
	 }

	ngOnInit() {

	}

}
