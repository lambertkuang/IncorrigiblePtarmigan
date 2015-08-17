/* create and export guest schema */
var mongoose = require('mongoose');
var GuestSchema = mongoose.Schema({
  guestName: {
    type: String, 
    required: true,
    unique: true
  },
  friendName: String,
  diningTableId: Number,
  constraints: Array,
  user: String
});

// create the model
var Guests = mongoose.model('Guests', GuestSchema);

// export it
module.exports = Guests;
