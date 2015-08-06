/* create and export diningTbl schema and model */
var mongoose = require('mongoose');
var DiningTableSchema = mongoose.Schema({
  diningTablename: String,
  guestsAtTable: Array,
  seatsPerTable: Number
});

var DiningTables = mongoose.model('DiningTables', DiningTableSchema);

module.exports = DiningTables;




// DiningTablename
// DT id 
// guest Array
// number of seats
