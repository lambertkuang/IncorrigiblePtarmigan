// TODO: Need to validate that the guest name is unique, so you can't add duplicate +1's 
// TODO: Do not allow empty strings to be submitted for the guestName input

angular.module('seatly.guestInput', [])
.controller('guestInputCtrl', function($scope, $location, guestInputFactory){
	// variables!
	$scope.guests = [];
	$scope.guestName = "";
	$scope.friendName = "";
	$scope.enemy = "";
	$scope.showConstraints = false;
	$scope.peoplePerTable = null;

	// add a guest and possible +1 to guests view
	$scope.addGuest = function(){
		var guest = {
			"guestName": $scope.guestName,
			"friendName": $scope.friendName,
			"diningTableId": null,
			"constraints": []
		};
		$scope.guests.push(guest);

		if($scope.friendName){
			var newGuest = {
				"guestName": $scope.friendName,
				"friendName": $scope.guestName,
				"diningTableId": null,
				"constraints": []
			};
			$scope.guests.push(newGuest);
		}
		// reset the fields
		$scope.guestName = "";
		$scope.friendName = "";
	};

	// POST all guests to database
	$scope.addAllGuests = function(){
		// add final constraints if applicable
		if ($scope.guest !== '' && $scope.guest !== '') {
			$scope.addConstraint();
		}
		// format the data in the form that the server expects
		var result = {
			guests: $scope.guests
		};
		// for developer use
		console.dir($scope.guests);

    // POST all guests to database
    guestInputFactory.addAllGuests(result)
    .then(function() {
	    // then find number of tables
	    // and POST to tables/sort to use algorithm
    	guestInputFactory.sortGuests($scope.peoplePerTable)
    	.then(function() {
		    // when that's done, redirect user to 
		    // list page
    		console.log('55, ready to redirect');
    		// redirect to list page
    		$location.path('/list');
    	})
    	.catch(function(err) {
    		console.log(65, new Error(err));
    	});
    }) // end of then from addAllGuests
    .catch(function(err) {
    	console.log(69, new Error(err));
    }); // end of catch from addAllGuests

	};

	// add final guest and switch views
	$scope.showConstraintsView = function(){
		// add whatever guest is left, if any
		if ($scope.guestName !== '') {
			$scope.addGuest();
		}
		// called on button click to show the constraints view
		$scope.showConstraints = true;
	};

	// add bi-directional constraints
	$scope.addConstraint = function(){
		// For 2 dropdowns: Guest in col 1 is 'guest', guest in col 2 is 'enemy'
    // access the constraints array of the guest
    // if the enemy hasn't already been added, add it
    if ($scope.guest && $scope.guest.constraints.indexOf($scope.enemy.guestName) === -1) {
			$scope.guest.constraints.push($scope.enemy.guestName);
    }
		if ($scope.enemy && $scope.enemy.constraints.indexOf($scope.guest.guestName) === -1) {
			// To create bi-directional constraint listings
			// access the constraints array of the enemy
			$scope.enemy.constraints.push($scope.guest.guestName);
		}

		// reset constraints
		$scope.guest = '';
		$scope.enemy = '';
	};

});


// NOT NEEDED HERE -- the below logic describes edit capabilities, saving for info only
		// // attach a changes object to guest
		// var changes = $scope.guest.changes; 
		// // set value of changes object to the changesArray
		// $scope.guest.changes = changesArray;
		// // set the first element in the constraints array to the guest name 
		// constraints[0] = $scope.guest.guestName;
		// // push enemy into the constraints array
		// constraints.push(enemy);
		// // push the constraints into the changes array 
		// changesArray.push( { "constraints": constraints });
		// // call the factory fcn to add constraints to the guest object
		// guestInputFactory.addConstraints(guest, changesArray);
		// // reset constraints array
		// constraints = [];
		// // reset changesArray 
		// changesArray = [];
