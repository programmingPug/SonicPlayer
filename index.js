const express = require('express');
const http = require('http');
const path = require("path");


const app = express();
const port = 8080;

app.use(express.static(__dirname + '/player/dist/player'));
app.get('/*', function (req, res)
{
	res.sendFile(path.join(__dirname));
});


/*
app.use(function (req, res, next)
{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
*/

const server = http.createServer(app);

server.listen(port, () =>
	console.log(`listening on ${port}`)
);

var io = require('socket.io').listen(server);

io.on('connection', function (socket)
{
	console.log('a user connected');
	socket.on('disconnect', function ()
	{
		console.log('user disconnected');
	});

	socket.on('color', function (msg)
	{
		//colorSet = msg; 
		led.color(msg);
		console.log('message: ' + msg);
		io.emit('color', msg);
	});


	socket.on('intensitySetting', function (msg)
	{
		//led.color( colorSet );
		led.intensity(msg);
		console.log('Intensity: ' + msg);
		//io.emit('color', msg);
	});


});