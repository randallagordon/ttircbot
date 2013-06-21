"use strict";

var AUTH = require('locals').AUTH;
var USERID = require('locals').USERID;
var ROOMID = require('locals').ROOMID;

var Bot = require('ttapi');
var bot = new Bot(AUTH, USERID, ROOMID);

bot.on('speak', function (data) {
  // Respond to "/hello" command
  if (data.text.match(/^\/hello$/)) {
    bot.speak('Hey! How are you @'+data.name+' ?');
  }
});
