/* create and export guest schema */
var mongoose = require('mongoose');
var GuestSchema = mongoose.Schema({
  guestName: String,
  friendId: Number,
  diningTableId: Number,
  constraints: Array
});

var Guests = mongoose.model('Guests', GuestSchema);

module.exports = Guests;




//guest name 
//guest id (mongoose adds it by default)
// plus 1 id
//dining table id
// constraints
