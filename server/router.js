/* this will be our router for our express server */
var mongoose = require('mongoose');
var Guest = require('../app-db/guests/guestModel');
var User = require('../app-db/users/userModel');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var DiningTable = require('../app-db/diningTbl/diningTblModel');
var algo = require('./utils/diningTableAlgo');
var Q = require('q');
var jwt = require('jwt-simple');
var utils = require('./utils/utility');

module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../client'));

  // authentication middleware used to decode token and make user available on the request
  // request.user will be the username
  app.use('/guest/*', utils.decode);
  // not DRY, but useable
  app.use('/tables/*', utils.decode);

////////////////////////////////////////////////////////
//                 AUTHENTICATION                     //
////////////////////////////////////////////////////////

// SIGN UP USER
// this is callback system, should refactor to promises
  app.post('/user/signup', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var create, newUser;
    var findOne = Q.nbind(User.findOne, User);

    // check to see if user already exists
    findOne({username: username})
      .then(function(user) {
        if (user) {
          next(new Error('User already exists'));
        } else {
          // make a new user if not already existing
          create = Q.nbind(User.create, User);
          newUser = {username: username, password: password};
          return create(newUser);
        }
      })
      .then(function(user) {
        var token = jwt.encode(user, 'secret');
        res.json({token: token});
      })
      .fail(function(error) {
        next(error);
      });
  }); // end of post to signup

  // SIGN IN USER
  app.post('/user/signin', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function(user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePassword(password)
            .then(function(foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token:token});
              } else {
                return next(new Error('No User'));
              }
            });
        }
      })
      .fail(function(error) {
        next(error);
      });
  }); // end post to signin

  // developer-centered route to get all users in database
  // TODO: remove or comment this out once we get running
  app.get('/user/signup', function(req, res) {
    User.find({}, function(err, users) {
      if (err) console.log(err);
      res.end(JSON.stringify(users));
    });
  });

////////////////////////////////////////////////////////
//                     GUEST INFO                     //
////////////////////////////////////////////////////////

// client-side posts a list of guests
  app.post('/guest/create', function(req, res) {
    console.log('------------------------------');
    console.log(req.body.guests[0]);
    // console.log(req.body.guests);
    console.log('------------------------------');
    var guests = req.body.guests;
    for(var i =0; i<guests.length;i++){
      var newGuest = new Guest ({
        guestName: guests[i].guestName,
        friendName: guests[i].friendName,
        constraints: guests[i].constraints,
        user: req.user
      });
      newGuest.save(function(err,newGuest){
        if(err) return console.log(err);
        console.log('//////WE\'RE SAVING OMG!!! CRAZY !!!! ')
      });
    }
    res.send(200);
  });

//retrieves all guests
  app.get('/guest', function(req, res){
    Guest.find(function(err, guests){
      if(err) return console.log(err);
      //console.log(guests);
      console.log(184, 'guests gotten');
      if(guests) {
        res.send(200, guests);
      } else {
        res.send(404);
      }
    });
  });

  // retrieve one guest
  app.post('/guest/one', function(req, res) {
    Guest.findOne({'guestName': req.body.name}, function(err, guest) {
      if (err) {
        console.log(196, err);
        res.send(500);
        return;
      }
      res.send(201, guest);
    });
  });

// edit guest properties
  app.put('/guest/edit', function(req, res){
    var changes = req.body.changes;
    console.log('-------------->', changes);
    // test object: { "changes": [ "Jennie Kim", { "guestName": "JK", "friendName": "Eric"} ]}
    Guest.findOne({ guestName: changes[0]}, function(err, guest){
      console.log("inside findOne", 197, guest);
      if(err){
        // if there's an error
        console.log(202, err);
        res.send(400);
      } else if (!guest) {
        // if the guest hasn't been found
        console.log(206, 'no guest');
        res.send(500);
      } else {
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
      }
    });
  });

  // drop all guests, regardless of user
  app.post('/guest/clear', function(req, res) {
    Guest.find().remove(function(err) {
      if (err) return console.log(err);
      res.send(200);
    });
  });

////////////////////////////////////////////////////////
//                      ALGO INFO                     //
////////////////////////////////////////////////////////


  // This will use the sorting algorithm to arrange the list of guests into multiple dining tables
  // Client will pass in numPerTable
  app.post('/tables/sort', function(req, res) {
    // remove current diningTables
    DiningTable.find({user: req.user}).remove(function(err) {
      if (err) return console.log(err);
    });
    // expecting client to pass in a numPerTable
    var numPerTable = req.body.numPerTable;
    Guest.find({user: req.user}, function(err, guests) {
      var diningTables = algo.makeDiningTables(guests, numPerTable);
      // loop through diningTables
      diningTables.forEach(function(diningTable, index) {
        var dt = new DiningTable({
          diningTableName: index + 1,
          guestsAtTable: diningTable,
          user: req.user
        });
        dt.save(function(err, table) {
          if (err) {
            res.send(400);
          } else {
            console.log('Saved dining table');
            res.send(200);
          }
        });
      });
    });
  });

  // returns a matrix of dining tables (an array of arrays; the nested
  // arrays are the dining tables, full of guest objects)
  app.get('/tables/get', function(req, res) {
    console.log(227, req.user);
    DiningTable.find({user: req.user}, function(err, diningTables) {
      if (err) return console.log(new Error(err));
      //console.log(diningTables);
      console.log('diningTables gotten');
      if (!!diningTables) {
        res.send(200, diningTables);
      } else {
        res.send(404);
      }
    });
  });

////////////////////////////////////////////////////////
//                  EVERYTHING ELSE                   //
////////////////////////////////////////////////////////

// wildcard route
  app.get('*', function(req, res){
    res.end('404 Not Found');
  });

}; // end export


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
