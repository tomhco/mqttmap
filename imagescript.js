/* jslint node: true */
'use strict';

var server = require('http').createServer();
var io = require('socket.io')(server);
var machina = require('machina');
var mqtt = require('mqtt');

var client = mqtt.createClient(1883, 'broker.i-dat.org');

var sendState = function (socket) {

	if (typeof socket === 'object') {

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
			onEnter: sendState,
			sendState: sendState
		},

		'2': {
			onEnter: sendState,
			sendState: sendState
		}

	}

};

var cubeOne = new machina.Fsm(SquareFsm);
cubeOne.command = 'cubeOne';
cubeOne.images = [
	'http://www.catchannel.com/images/sleeping-cat-pictures.jpg',
	'http://static.ddmcdn.com/gif/kitten-cuteness300.jpg',
	'http://www.petandbirdclinic.com/p37B1rd/wp-content/uploads/2012/01/cat-fur-chewing.jpg'
];

var cubeTwo = new machina.Fsm(SquareFsm);
cubeTwo.command = 'cubeTwo';
cubeTwo.images = [
	'http://www.catchannel.com/images/sleeping-cat-pictures.jpg',
	'http://static.ddmcdn.com/gif/kitten-cuteness300.jpg',
	'http://www.petandbirdclinic.com/p37B1rd/wp-content/uploads/2012/01/cat-fur-chewing.jpg'
];

var cubeThree = new machina.Fsm(SquareFsm);
cubeThree.command = 'cubeThree';
cubeThree.images = [
	'http://www.catchannel.com/images/sleeping-cat-pictures.jpg',
	'http://static.ddmcdn.com/gif/kitten-cuteness300.jpg',
	'http://www.petandbirdclinic.com/p37B1rd/wp-content/uploads/2012/01/cat-fur-chewing.jpg'
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
