/* create and export diningTbl schema and model */
var mongoose = require('mongoose');

var DiningTableSchema = mongoose.Schema({
  diningTableName: String,
  guestsAtTable: Array,
  seatsPerTable: Number,
  user: String
});

// create the model
var DiningTables = mongoose.model('DiningTables', DiningTableSchema);

// export it
module.exports = DiningTables;
