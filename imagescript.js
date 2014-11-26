/* jslint node: true */
'use strict';

var server = require('http').createServer();
var io = require('socket.io')(server);
var machina = require('machina');

var SquareFsm = machina.Fsm.extend({

	initialState: 0,

	sendState: function (command, socket) {
		io.sockets.emit(command, this.images[this.state]);
	},

	states: {

		0: {
			_onEnter: this.sendState.bind(this)
		},

		1: {
			onEnter: this.sendState.bind(this)
		},

		2: {
			onEnter: this.sendState.bind(this)
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

	cubeOne.sendState(0, socket);
	cubeTwo.sendState(0, socket);
	cubeThree.sendState(0, socket);

});

server.listen(3000);
