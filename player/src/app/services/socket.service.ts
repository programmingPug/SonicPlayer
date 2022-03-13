import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

@Injectable({
	providedIn: 'root'
})
export class SocketService
{

	private url = 'http://localhost:8080';
	private socket;

	constructor()
	{
		this.socket = io(this.url);
	}

	public sendContextBit(value)
	{
		this.socket.emit('contextBit', value);
	}

	public sendLightShowSwitch( toggleSwitch )
	{
		this.socket.emit('lightShowSwitch', toggleSwitch);
	}

	public sendLightShowColor(hexColor)
	{
		this.socket.emit('lightShowColor', hexColor);
	}


}
