'use strict';

let Bot = require('javascript-jass-bot');
let SimpleStrategy = require('./simple-bot');
let MonikaStrategy = require('./monika-bot');

const url = 'localhost:3000';

new Bot('monika').withStrategy(new MonikaStrategy()).connect(url);
new Bot('monika').withStrategy(new SimpleStrategy()).connect(url);
new Bot('simple').withStrategy(new SimpleStrategy()).connect(url);
new Bot('simple').withStrategy(new SimpleStrategy()).connect(url);