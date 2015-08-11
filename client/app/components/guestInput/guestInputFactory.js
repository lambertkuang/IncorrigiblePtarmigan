angular.module('seatly.guestInput')
.factory('guestInputFactory', function($http){
	var addAllGuests = function(guestsArray){
		return $http({
			method: 'POST',
			url: '/create',
			data: guestsArray
		});
	};

	var addConstraints = function(guest, changesArray){
		console.log("addConstraints");
		return $http({
			method: 'PUT',
			// TODO: update this url
			url: '/create',
			data: guest,
			params: {changes: changesArray}
		});
	};

	return {
		'addAllGuests': addAllGuests,
		'addConstraints': addConstraints
	};

});


// edit guest properties
  // app.put('/edit', function(req, res){
  //   var changes = req.body.changes;

  //   // test object: { "changes": [ "Jennie Kim", { "guestName": "JK", "friendName": "Eric"} ]}
  //   Guest.findOne({ guestName: changes[0]}, function(err, guest){
  //     console.log("inside findOne");
  //     if(err){
  //       res.send(400);
  //     }
  //     for(var key in changes[1]) {
  //       guest[key] = changes[1][key];
  //     }
  //     guest.save(function(err){
  //       if(err) {
  //         res.send(400);
  //       } else {
  //         res.send(200);
  //       }
  //     });
  //   });
  // });
