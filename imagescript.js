/* jslint node: true */
'use strict';

var server = require('http').createServer();
var io = require('socket.io')(server);
var machina = require('machina');

var sendState = function (socket) {
	io.sockets.emit(this.command, this.images[this.state]);
};

var SquareFsm = {

	initialState: '0',
	command: '',
	images: [],

	states: {

		'0': {
			_onEnter: sendState
		},

		'1': {
			onEnter: sendState
		},

		'2': {
			onEnter: sendState
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

io.on('connection', function (socket) {

	cubeOne.sendState('0', socket);
	cubeTwo.sendState('1', socket);
	cubeThree.sendState('2', socket);

});

server.listen(3000);
