/* jslint node: true */
'use strict';

var fs = require( 'fs' );
var index = fs.readFileSync( 'index2.html' );

var server = require( 'http' ).createServer( function ( req, res ) {

  res.writeHead( 200, {
    'Content-Type': 'text/html'
  } );

  res.end( index );

} );

var io = require( 'socket.io' )( server );
var machina = require( 'machina' );
var mqtt = require( 'mqtt' );

var client = mqtt.createClient( 80, 'broker.i-dat.org' );

var sendState = function ( socket ) {

  if ( typeof socket !== 'undefined' ) {

    socket.emit( this.command, this.colors[ this.state ] );
    return;

  }

  io.sockets.emit( this.command, this.colors[ this.state ] );

};

var SquareFsm = {

  initialState: '0',
  command: '',
  colors: [],

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
    },

    '3': {
      _onEnter: sendState,
      sendState: sendState
    }

  }

};

var routeZero = new machina.Fsm( SquareFsm );
routeZero.command = 'route0';
routeZero.colors = [
  'green',
  'orange',
  'red',
  'grey'
];

var routeOne = new machina.Fsm( SquareFsm );
routeOne.command = 'route1';
routeOne.colors = [
  'green',
  'orange',
  'red',
  'grey'
];

var routeTwo = new machina.Fsm( SquareFsm );
routeTwo.command = 'route2';
routeTwo.colors = [
  'green',
  'orange',
  'red',
  'grey'
];

client.subscribe( 'domtom/one' );
client.subscribe( 'domtom/two' );
client.subscribe( 'domtom/three' );
client.subscribe( 'domtom/twitter' );

client.on( 'message', function ( topic, payload ) {

  console.log( topic, payload );

  switch ( topic ) {
  case 'domtom/one':
    routeZero.transition( payload );
    break;
  case 'domtom/two':
    routeOne.transition( payload );
    break;
  case 'domtom/three':
    routeTwo.transition( payload );
    break;
  case 'domtom/twitter':
    io.sockets.emit( 'twitter', payload );
    routeTwo.transition( 3 );
    break;

  }

} );

io.on( 'connection', function ( socket ) {

  socket.on( 'route0', function () {

    routeZero.handle( 'sendState', socket );

  } );

  socket.on( 'route1', function () {

    routeOne.handle( 'sendState', socket );

  } );

  socket.on( 'route2', function () {

    routeTwo.handle( 'sendState', socket );

  } );

} );

server.listen( 3000, function () {

  console.log( 'Server probably started' );

} );
