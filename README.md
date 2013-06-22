# ttircbot #####################################################################

A Turntable.fm and IRC Bot—in one!

### Installation and Setup

    $ git clone https://github.com/randallagordon/ttircbot.git
    $ npm install

Copy `locals.js.ex` to `locals.js`:

    // Use the Turntable-API bookmarklet and put your keys here
    module.exports.TTAUTH  = "";
    module.exports.TTUSER  = "";
    module.exports.TTROOM  = "";
    
    module.exports.IRCNET  = "";
    module.exports.IRCNICK = "";
    module.exports.IRCCHAN = "";

Fire it up with `node index.js`!

## License #####################################################################

MIT

