"use strict";

var Bot    = require('ttapi');
var repl   = require('repl');
var irc    = require('irc');

var AUTH   = require('locals').AUTH;
var USERID = require('locals').USERID;
var ROOMID = require('locals').ROOMID;

var ttBot = new Bot(AUTH, USERID, ROOMID);
repl.start('> ').context.ttBot = ttBot;

var ircChannel = "#codescouts-inane";
var ircBot = new irc.Client('irc.freenode.net', 'ranbot4000', {
  channels: [ ircChannel ]
});


ttBot.on('newsong', function(songData) {
  ttBot.getProfile( songData.room.metadata.current_dj, function(userData) {
    var songChangeMsg = userData.name + " started playing \"" + songData.room.metadata.current_song.metadata.song + "\" by " + songData.room.metadata.current_song.metadata.artist;

    // Say in channel
    ircBot.say( ircChannel, songChangeMsg );

    // Auto up vote love
    ttBot.bop();
  });
});

ircBot.addListener('error', function(message) {
  console.log('error: ', message);
});

