var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

require('./keys.js');
var tw = require('node-tweet-stream')({
    consumer_key: k1,
    consumer_secret: k2,
    token: k3,
    token_secret: k4
  });

var track = 'trump';

tw.track(track);

tw.on('tweet', function(tweet){
  io.emit('tweet', tweet);
});

io.on('connection', function(socket){
	socket.on('track-name-change', function(newName){
		tw.untrack(track);
		tw.track(newName);
		track = newName;
		console.log("Tracking:", tw.tracking());
	});
});


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

server.listen(3000, function(){
	console.log('Listening on port 3000');
});
