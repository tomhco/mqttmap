/* jslint node: true */
'use strict';

var mqtt = require('mqtt');
var client = mqtt.createClient(1883, 'localhost');

setTimeout(function () {

	client.publish('demo/device/test', 'James is awesomes!');

}, 5000);
