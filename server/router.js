/* this will be our router for our express server */
var mongoose = require('mongoose');
var Guest = require('../app-db/guests/guestModel');
var User = require('../app-db/users/userModel');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');



module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../client'));

  // app.get('/', function(req, res) {
  //   res.send('Hellooooo WOOOOOORLD!!!!');
  // });

// client POSTs signup and login
// this is callback system, should refactor to promises
  app.post('/api/user/signup', function(req, res) {
    // check to see if the username already exists
    console.log('woooo signup begins');
    User.count({username: req.body.username}, function(err, num) {
      // error querying database
      if (err) {
        console.log(new Error(err));
        res.end();
      } else {
        if (num > 0) {
          // no error saving, but there's already a user
          res.end('That username is already taken. Try again, please.');
        } else {
          // no user, free to proceed
          var newUser = new User({
            username: req.body.username,
            password: req.body.password
          });
          newUser.save(function(err, user) {
            //if there's an error saving
            if (err) {
              console.log(new Error(err));
              res.end(err);
            } else {
              // otherwise, start session...
              // redirection is taken care of on client-side
              console.log('successfully saved new user');
              res.end();
            }
          }); // end of save
        }
      }
    }); // end of count
  }); // end of post

// client-side posts a list of guests
  app.post('/create', function(req,res) {
    console.log('------------------------------');
    // console.log(req.body.guests[0]);
    console.log(req.body.guests);
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
        console.log('//////WE\'RE SAVING OMG!!! CRAZY !!!! ')
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

// edit guest properties
  app.put('/edit', function(req, res){
    var changes = req.body.changes;

    // test object: { "changes": [ "Jennie Kim", { "guestName": "JK", "friendName": "Eric"} ]}
    Guest.findOne({ guestName: changes[0]}, function(err, guest){
      console.log("inside findOne");
      if(err){
        res.send(400);
      }
      for(var key in changes[1]) {
        guest[key] = changes[1][key];
      }
      guest.save(function(err){
        if(err) {
          res.send(400);
        } else {
          res.send(200);
        }
      });
    });
  });

// wildcard route
  app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/client/auth/signupView.html'));
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
