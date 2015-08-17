/* this is our express server */

var express = require('express');
var mongoose = require('mongoose');
var app = express();

var host = process.env.host || 'localhost';
var port = process.env.port || 8000;

// connect to mongoose
mongoose.connect('mongodb://' + host + '/seatly');  // TODO: change to production env

require('./router.js')(app, express);

app.listen(port, host); // TODO: change to production env

// export it
module.exports = app;
