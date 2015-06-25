#!/usr/bin/env node

var url = 'http://127.0.0.1:8080/pubscript';
var options = {port: 8080};
var socket = require('socket.io-client')(url, options);
console.log('Connecting to ' + url);
socket.on('connect', function(){
    console.log('SocketIO Connected');
});
socket.on('connect_error', function(error){
    console.log('SocketIO error:' + JSON.stringify(error));
});
socket.on('connect_timeout', function(error){
    console.log('SocketIO timeout');
});
socket.on('event', function(data){
    console.log('event');
    console.log(JSON.stringify(data));
});
socket.on('disconnect', function(){
    console.log('SocketIO disconnected');
});
