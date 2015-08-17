/* this is our express server */

var express = require('express');
var mongoose = require('mongoose');
var app = express();

var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 5000;
var localuri = 'mongodb://localhost/seatly';
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || localuri;

// connect to mongoose
mongoose.connect(uristring, function(err, res) {
  if (err) {
    console.log('Error connecting to: ' + uristring + ' ' + err);
  } else {
    console.log('Succeeded connecting to ' + uristring);
  }
});

require('./router.js')(app, express);

app.listen(port, host); // TODO: change to production env

// export it
module.exports = app;
