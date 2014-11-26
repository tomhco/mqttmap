/* jslint node: true */
'use strict';

var server = require('http').createServer();
var io = require('socket.io')(server);
var machina = require('machina');

var images = [

	[
		'http://www.catchannel.com/images/sleeping-cat-pictures.jpg',
		'http://static.ddmcdn.com/gif/kitten-cuteness300.jpg',
		'http://www.petandbirdclinic.com/p37B1rd/wp-content/uploads/2012/01/cat-fur-chewing.jpg'
	],

	[
		'http://www.catchannel.com/images/sleeping-cat-pictures.jpg',
		'http://static.ddmcdn.com/gif/kitten-cuteness300.jpg',
		'http://www.petandbirdclinic.com/p37B1rd/wp-content/uploads/2012/01/cat-fur-chewing.jpg'
	],

	[
		'http://www.catchannel.com/images/sleeping-cat-pictures.jpg',
		'http://static.ddmcdn.com/gif/kitten-cuteness300.jpg',
		'http://www.petandbirdclinic.com/p37B1rd/wp-content/uploads/2012/01/cat-fur-chewing.jpg'
	],

];

var SquareFsm = machina.Fsm.extend({

	initialState: '0',

	sendState: function (command, socket) {
		io.sockets.emit(command, images[command][this.state]);
	},

	states: {

		'0': {
			_onEnter: this.sendState
		},

		'1': {
			onEnter: this.sendState
		},

		'2': {
			onEnter: this.sendState
		}
	}

});

var cubeOne = new SquareFsm();
var cubeTwo = new SquareFsm();
var cubeThree = new SquareFsm();

io.on('connection', function (socket) {

	cubeOne.sendState('0', socket);
	cubeTwo.sendState('1', socket);
	cubeThree.sendState('2', socket);

});

server.listen(3000);
