/* create and export diningTbl schema and model */
var mongoose = require('mongoose');
// can probably remove seatsPerTable
var DiningTableSchema = mongoose.Schema({
  diningTableName: String,
  guestsAtTable: Array,
  seatsPerTable: Number,
  user: String
});

var DiningTables = mongoose.model('DiningTables', DiningTableSchema);

module.exports = DiningTables;




// DiningTablename
// DT id
// guest Array
// number of seats
