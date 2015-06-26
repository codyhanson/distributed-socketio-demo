"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
server.listen(8080);

// Handle socket.io traffic
var srvId = Math.floor(Math.random() * 1000);

//SocketIO Namespace
var nsp = io.of('/pubnamespace');
nsp.on('connection', function(socket){
      console.log('client connected');
      socket.join('pubscript', function(err){
          if (err) console.log('room join err:' + JSON.stringify(err));
      }); 
});

app.post('/pub', function(req, res){
    var key = req.body.key;
    var msg = {msg: req.body.msg, srv:srvId};
    console.log('Processing key:' + key + ' msg:' + JSON.stringify(msg) + ' srvId:' + srvId);
    nsp.to('pubscript').emit('pubevent', msg);
    res.send('msg sent - handled by ' + srvId);
});

console.log("Express listening on 8080");

