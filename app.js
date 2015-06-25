"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

server.listen(8080);

//// Set up the redis store for socket.io
//var RedisStore = require('socket.io/lib/stores/redis'),
//    redis  = require('socket.io/node_modules/redis'),
//    url = require('url'),
//    redisURL = url.parse(process.env.REDIS_STORE_URL),
//    pub    = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true}),
//    sub    = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true}),
//    client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
//
//if(redisURL.auth) {
//   pub.auth(redisURL.auth.split(":")[1]);
//   sub.auth(redisURL.auth.split(":")[1]);
//   client.auth(redisURL.auth.split(":")[1]);
//}

// Handle socket.io traffic
io.on('connection', function (socket) {
   console.log('Socket.io new connection');
   socket.emit('ack');
   socket.on('sub', function (data) {
      socket.join(data.key);  // make a room
   });

   socket.on('disconnect', function (data) {
      console.log('Socket.io disconnected');
   });
});

var srvId = Math.floor(Math.random() * 1000);

var nsp = io.of('/pubscript');
nsp.on('connection', function(socket){
      console.log('someone connected');
      socket.emit('ack', 'ack');
      socket.join('pubscript', function(err){
          console.log('room join err:' + JSON.stringify(err));
      });  
});

app.post('/pub', function(req, res){
    var key = req.body.key;
    var msg = {msg: req.body.msg, srv:srvId};
    console.log('Processing key:' + key + ' msg:' + JSON.stringify(msg) + ' srvId:' + srvId);
    nsp.to('pubscript').emit('pubscript', msg);
    nsp.emit('pubscript', msg);
    res.send('msg sent - handled by ' + srvId);
});

console.log("Express listening on 8080");

