'use strict';

let Bot = require('javascript-jass-bot');
let MonikaStrategy = require('./monika-bot');

const url = '192.168.200.31:3000';

new Bot('MonikaFasnacht-OnSteroids♥').withStrategy(new MonikaStrategy()).connect(url);
new Bot('MonikaFasnacht-OnSteroids♥').withStrategy(new MonikaStrategy()).connect(url);