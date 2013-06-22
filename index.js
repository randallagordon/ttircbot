"use strict";

// require() necessary Node libraries
var Bot    = require("ttapi");
var irc    = require("irc");

// Pull in sensitive settings from locals.js
var TTAUTH  = require("locals").TTAUTH;
var TTUSER  = require("locals").TTUSER;
var TTROOM  = require("locals").TTROOM;
var IRCNET  = require("locals").IRCNET;
var IRCNICK = require("locals").IRCNICK;
var IRCCHAN = require("locals").IRCCHAN;

// Start a REPL to interact with the bots
var repl = require("repl").start( "> " );

// Setup Turntable Bot
var ttBot = new Bot( TTAUTH, TTUSER, TTROOM );
repl.context.ttBot = ttBot;

// Setup IRC Bot
var ircBot = new irc.Client( IRCNET, IRCNICK, {
  channels: [ IRCCHAN ]
});
repl.context.ircBot = ircBot;

// When there's a new song, pipe it to IRC
ttBot.on( "newsong", function( songData ) {
  ttBot.getProfile( songData.room.metadata.current_dj, function( userData ) {
    var songChangeMsg = userData.name + " started playing \"" + songData.room.metadata.current_song.metadata.song + "\" by " + songData.room.metadata.current_song.metadata.artist;

    // Say in channel
    ircBot.say( IRCCHAN, songChangeMsg );

    // Auto up vote love
    ttBot.bop();
  });
});

// As per the node-irc README, this keeps the bot from crashing on IRC errors
ircBot.addListener( "error", function( message ) {
  console.log( "error: ", message );
});

