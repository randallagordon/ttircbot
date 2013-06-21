"use strict";

var Bot  = require('ttapi');
var repl = require('repl');

var AUTH = require('locals').AUTH;
var USERID = require('locals').USERID;
var ROOMID = require('locals').ROOMID;

var bot = new Bot(AUTH, USERID, ROOMID);

repl.start('> ').context.bot = bot;

bot.on('speak', function (data) {
  // Respond to "/hello" command
  if (data.text.match(/^\/hello$/)) {
    bot.speak('Hey! How are you @'+data.name+' ?');
  }
});

bot.on('newsong', function(songData) {
  bot.getProfile( songData.room.metadata.current_dj, function(userData) {
    console.log(userData.name + " started playing \"" + songData.room.metadata.current_song.metadata.song + "\" by " + songData.room.metadata.current_song.metadata.artist );
    bot.bop();
  });
});
