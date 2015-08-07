/* this will be our router for our express server */
var mongoose = require('mongoose');
var Guest = require('../app-db/guests/guestModel');

var bodyParser = require('body-parser');



module.exports = function(app, express) {

  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());

  app.get('/', function(req, res) {
    res.send('Hellooooo WOOOOOORLD!!!!');
  });

// posts a list of guests
  app.post('/create', function(req,res) {
    console.log('------------------------------');
    // console.log(req.body.guests[0]);
    console.log(req.body.guests[0]);
    console.log('------------------------------');
    var guests = req.body.guests;
    for(var i =0; i<guests.length;i++){
      var newGuest = new Guest ({
        guestName: guests[i].guestName,
        friendName: guests[i].friendName,
        constraints: guests[i].constraints
      });
      newGuest.save(function(err,newGuest){
        if(err) return console.log(err);
        console.log('//////WERE SAVING OMG!!! CRAZY !!!! ')
      });
    }
    res.send(200);
  });

//retrieves all guests
  app.get('/create', function(req, res){
    Guest.find(function(err, guests){
      if(err) return console.log(err);
      console.log(guests);
      if(guests) {
        res.send(200, guests);
      } else {
        res.send(404);
      }
    });
  }); 
};




// detect the url route
// read the data
// post to the database



// Add guests
// Add relationships (+1s)
// Add constraints ('enemies')

/* example objects for tests 

Note: in Postman when doing a 'POST', it's important to input in the body by selection the 'raw' option and 
using a json format like so:
{"guests":[{"guestName":"marco","friendName":"Lambert", "constraints":[]}]}


these are not valid syntax for postman
{guests:[{guestName:'marco',friendName:'Lambert'},{guestName:'Lambert',friendName:'marco'},{guestName:'Kiri'}]}
[{guestName:'marco',friendName:'Lambert'},{guestName:'Lambert',friendName:'marco'},{guestName:'Kiri'}]
[{guestName:'marco',friendName:'Lambert', constraints:[]}]
*/
