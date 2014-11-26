/* jslint node: true */
'use strict';

var fs = require('fs');
var index = fs.readFileSync('index.html');

var server = require('http').createServer(function (req, res) {

	res.writeHead(200, {
		'Content-Type': 'text/html'
	});

	res.end(index);

});

var io = require('socket.io')(server);
var machina = require('machina');
var mqtt = require('mqtt');

var client = mqtt.createClient(1883, 'broker.i-dat.org');

var sendState = function (socket) {

	if (typeof socket !== 'undefined') {

		socket.emit(this.command, this.images[this.state]);
		return;

	}

	io.sockets.emit(this.command, this.images[this.state]);

};

var SquareFsm = {

	initialState: '0',
	command: '',
	images: [],

	states: {

		'0': {
			_onEnter: sendState,
			sendState: sendState
		},

		'1': {
			_onEnter: sendState,
			sendState: sendState
		},

		'2': {
			_onEnter: sendState,
			sendState: sendState
		}

	}

};

var cubeOne = new machina.Fsm(SquareFsm);
cubeOne.command = 'cubeOne';
cubeOne.images = [
	'http://i.imgur.com/CyClSSr.png',
	'http://i.imgur.com/mcpyvf4.png',
	'http://i.imgur.com/v7vsUMf.png'
];

var cubeTwo = new machina.Fsm(SquareFsm);
cubeTwo.command = 'cubeTwo';
cubeTwo.images = [
	'http://i.imgur.com/7EyQmVW.png',
	'http://i.imgur.com/EZsGDpa.png',
	'http://i.imgur.com/bHTJyFg.png'
];

var cubeThree = new machina.Fsm(SquareFsm);
cubeThree.command = 'cubeThree';
cubeThree.images = [
	'http://i.imgur.com/38MQ0B0.png',
	'http://i.imgur.com/7CwZpUC.png',
	'http://i.imgur.com/ok78Aat.png'
];

client.subscribe('domtom/one');
client.subscribe('domtom/two');
client.subscribe('domtom/three');

client.on('message', function (topic, payload) {

	switch (topic) {
	case 'domtom/one':
		cubeOne.transition(payload);
		break;
	case 'domtom/two':
		cubeTwo.transition(payload);
		break;
	case 'domtom/three':
		cubeThree.transition(payload);
		break;
	}

});

io.on('connection', function (socket) {

	cubeOne.handle('sendState', socket);
	cubeTwo.handle('sendState', socket);
	cubeThree.handle('sendState', socket);

});

server.listen(3000);
