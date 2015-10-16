'use strict';

let Bot = require('../../javascript-jass-bot/index');
let SimpleStrategy = require('./simple-bot');
let MonikaStrategy = require('./monika-bot');

const url = 'localhost:3000';

new Bot('MonikaFasnacht-OnSteroids♥').withStrategy(new MonikaStrategy()).connect(url);
new Bot('MonikaFasnacht-OnSteroids♥').withStrategy(new SimpleStrategy()).connect(url);
new Bot('simple').withStrategy(new SimpleStrategy()).connect(url);
new Bot('simple').withStrategy(new SimpleStrategy()).connect(url);