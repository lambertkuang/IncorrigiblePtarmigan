/* this will be our express server */

var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/seatly');

require('./router.js')(app, express);

app.listen(8000);

module.exports = app;


// app.get('/', function(req, res) {
//   res.send('Hellooooo WOOOOOORLD!!!!');
// });