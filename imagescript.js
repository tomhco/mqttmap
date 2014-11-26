/* jslint node: true */
'use strict';

var server = require('http').createServer();
var io = require('socket.io')(server);
var machina = require('machina');

var squareFsm = new machina.Fsm({

	initialState: 'one',
	images: [],

	states: {
		'one': {
			_onEnter: function () {
				this.handle('sendState');
			},

			sendState: function () {
				io.sockets.emit('cubeOne', this.images[0]);
			}
		},
		'two': {
			_onEnter: function () {
				this.handle('sendState');
			},

			sendState: function () {
				io.sockets.emit('cubeTwo', this.images[1]);
			}
		},
		'three' {
			_onEnter: function () {
				this.handle('sendState');
			},

			sendState: function () {
				io.sockets.emit('cubeThree', this.images[2]);
			}
		}
	}

});

var cubeOne = new squareFsm();
cubeOne.images = [
	'http://www.catchannel.com/images/sleeping-cat-pictures.jpg',
	'http://static.ddmcdn.com/gif/kitten-cuteness300.jpg',
	'http://www.petandbirdclinic.com/p37B1rd/wp-content/uploads/2012/01/cat-fur-chewing.jpg'
];

var cubeTwo = new squareFsm();
cubeTwo.images = [
	'http://www.catchannel.com/images/sleeping-cat-pictures.jpg',
	'http://static.ddmcdn.com/gif/kitten-cuteness300.jpg',
	'http://www.petandbirdclinic.com/p37B1rd/wp-content/uploads/2012/01/cat-fur-chewing.jpg'
];

var cubeThree = new squareFsm();
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
