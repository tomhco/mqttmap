/* jslint node: true */
'use strict';

var server = require('http').createServer();
var io = require('socket.io')(server);
var machina = require('machina');

var SquareFsm = machina.Fsm.extend({

	initialState: 'one',

	sendState: function (command, socket) {
		io.sockets.emit(command, this.images[this.state]);
	},

	states: {

		'one': {
			_onEnter: this.sendState
		},

		'two': {
			onEnter: this.sendState
		},

		'three': {
			onEnter: this.sendState
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

	cubeOne.sendState('one', socket);
	cubeTwo.sendState('two', socket);
	cubeThree.sendState('three', socket);

});

server.listen(3000);
