/* jslint node: true */
'use strict';

var server = require('http').createServer();
var io = require('socket.io')(server);
var machina = require('machina');

var SquareFsm = machina.Fsm.extend({

	initialState: 'one',
	command: '',
	images: [],

	states: {
		'one': {
			_onEnter: function () {
				this.handle('sendState');
			},

			sendState: function () {
				io.sockets.emit(this.command, this.images[0]);
			}
		},
		'two': {
			_onEnter: function () {
				this.handle('sendState');
			},

			sendState: function () {
				io.sockets.emit(this.command, this.images[1]);
			}
		},
		'three': {
			_onEnter: function () {
				this.handle('sendState');
			},

			sendState: function () {
				io.sockets.emit(this.command, this.images[2]);
			}
		}
	}

});

var cubeOne = new SquareFsm();
cubeOne.command = 'one';
cubeOne.images = [
	'http://www.catchannel.com/images/sleeping-cat-pictures.jpg',
	'http://static.ddmcdn.com/gif/kitten-cuteness300.jpg',
	'http://www.petandbirdclinic.com/p37B1rd/wp-content/uploads/2012/01/cat-fur-chewing.jpg'
];

var cubeTwo = new SquareFsm();
cubeOne.command = 'two';
cubeTwo.images = [
	'http://www.catchannel.com/images/sleeping-cat-pictures.jpg',
	'http://static.ddmcdn.com/gif/kitten-cuteness300.jpg',
	'http://www.petandbirdclinic.com/p37B1rd/wp-content/uploads/2012/01/cat-fur-chewing.jpg'
];

var cubeThree = new SquareFsm();
cubeOne.command = 'three';
cubeThree.images = [
	'http://www.catchannel.com/images/sleeping-cat-pictures.jpg',
	'http://static.ddmcdn.com/gif/kitten-cuteness300.jpg',
	'http://www.petandbirdclinic.com/p37B1rd/wp-content/uploads/2012/01/cat-fur-chewing.jpg'
];

io.on('connection', function (socket) {

	cubeOne.handle('sendState', socket);
	cubeTwo.handle('sendState', socket);
	cubeThree.handle('sendState', socket);

});

server.listen(3000);
