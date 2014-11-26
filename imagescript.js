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
			_onEnter: function (command, socket) {
				this.handle('sendState', command, socket);
			},

			sendState: function (command, socket) {
				io.sockets.emit(command, this.images[0]);
			}
		},
		'two': {
			_onEnter: function (command, socket) {
				this.handle('sendState', command, socket);
			},

			sendState: function (command, socket) {
				io.sockets.emit(command, this.images[1]);
			}
		},
		'three': {
			_onEnter: function (command, socket) {
				this.handle('sendState', command, socket);
			},

			sendState: function (command, socket) {
				io.sockets.emit(command, this.images[2]);
			}
		}
	}

});

var cubeOne = new SquareFsm();
cubeOne.images = [
	'http://www.catchannel.com/images/sleeping-cat-pictures.jpg',
	'http://static.ddmcdn.com/gif/kitten-cuteness300.jpg',
	'http://www.petandbirdclinic.com/p37B1rd/wp-content/uploads/2012/01/cat-fur-chewing.jpg'
];

var cubeTwo = new SquareFsm();
cubeTwo.images = [
	'http://www.catchannel.com/images/sleeping-cat-pictures.jpg',
	'http://static.ddmcdn.com/gif/kitten-cuteness300.jpg',
	'http://www.petandbirdclinic.com/p37B1rd/wp-content/uploads/2012/01/cat-fur-chewing.jpg'
];

var cubeThree = new SquareFsm();
cubeThree.images = [
	'http://www.catchannel.com/images/sleeping-cat-pictures.jpg',
	'http://static.ddmcdn.com/gif/kitten-cuteness300.jpg',
	'http://www.petandbirdclinic.com/p37B1rd/wp-content/uploads/2012/01/cat-fur-chewing.jpg'
];

io.on('connection', function (socket) {

	cubeOne.handle('sendState', 'one', socket);
	cubeTwo.handle('sendState', 'one', socket);
	cubeThree.handle('sendState', 'one', socket);

});

server.listen(3000);
