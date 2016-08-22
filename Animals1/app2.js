//import express 
var express = require('express');
//create express object named app
var app = express();

//Import Twitter module
var Twitter = require('twitter')

//instantiate a server on port 3000
var server = app.listen(3000);
var io = require('socket.io')(server);

//expose the local public folder for inluding files js, css etc..
app.use(express.static('public'));

//on a request to / serve index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Authenticates with Twitter using the (unofficial) twitter
// package on npm. This is required for using the interesting parts
// of the API, e.g. streaming or posting tweets.
var client = new Twitter({
    consumer_key: 'N1AJcLKAp0MGPnnQAlNl1KcnL',
    consumer_secret: '6VywLxzyWgKIfkgU4UzoVumFqL165rE1bsGQQMne3wtNFqMnpN',
    access_token_key: '16472104-FIv802PCJPnkfQ0xcDGxqBvPyEtuuuqrDIZ2aHsmH',
    access_token_secret: 'PPRioPU7dxFNloGGj9QbQbb14FT2sPmupXL0QmovVKzjx'
})

client.stream('statuses/filter', {
//track a word
        track: 'Climate Change',

    }, function(tweetStream) {
        // `tweetStream` will emit a "data" event whenever
        // a new tweet is posted. These will be in the same format
        // as seen in the first example.
        tweetStream.on('data', function(tweet) {
            //log tweet to the console
            console.log(tweet.text);
            io.sockets.emit('socket1', tweet.text);
        })
});

var client2 = new Twitter({
    consumer_key: 'YLD1uEsvsxyF5if8emshgGsNA',
    consumer_secret: 'ytaHKac8YdonHFFNwB2cPhjQYjA9iU8nVMKEppGYewKHnQToXS',
    access_token_key: '16472104-ItFmLjjzdmePDKU4nAhE4rx90gc9UxkSDUFOZoiGd',
    access_token_secret: 'gByUAuCvaad0dYljQpbEu5cfb5u061bdi7d8Q0VUf0eee'
})

client2.stream('statuses/filter', {
//track a word
        track: 'Kardashian',

    }, function(tweetStream) {
        // `tweetStream` will emit a "data" event whenever
        // a new tweet is posted. These will be in the same format
        // as seen in the first example.
        tweetStream.on('data', function(tweet) {
            //log tweet to the console
            console.log(tweet.text);
            io.sockets.emit('socket2', tweet.text);
        })
});

