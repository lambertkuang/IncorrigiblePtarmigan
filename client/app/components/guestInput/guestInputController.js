// TODO: Need to validate that the guest name is unique, so you can't add duplicate guests

angular.module('seatly.guestInput', [])
.controller('guestInputCtrl', function($scope, $location, guestInputFactory, Auth){
  // initialize variables
	$scope.guests = [];
	$scope.guestName = "";
	$scope.friendName = "";
	$scope.enemy = "";
	$scope.peoplePerTable = null;

	// variables for hiding/showing
	$scope.peopleInput = true;
	$scope.guestInput = false;
	$scope.constraintInput = false;

	// variable to reset pristine status of input after user clicks "Continue adding guests"
	$scope.isPristineAgain = false;

	// save number of guests per tables; move on to adding guests
	$scope.moveOn = function() {
		$scope.peopleInput = false;
		$scope.guestInput = true;
	};

	// add a guest and optional +1 to guests view
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
		// reset the guest input fields
		$scope.guestName = "";
		$scope.friendName = "";
		// Reset form input to pristine to prevent validation error
		$scope.isPristineAgain = true;
	};

	// POST all guests to database
	$scope.addAllGuests = function(){
		// add final constraints if applicable
		if ($scope.guest !== '' && $scope.guest !== '') {
			$scope.addConstraint();
		}
		// format data in the form that the server expects
		var result = {
			guests: $scope.guests
		};

    // POST all guests to database
    guestInputFactory.addAllGuests(result)
    .then(function() {
	    // find number of tables, POST to tables, using sort algorithm
    	guestInputFactory.sortGuests($scope.peoplePerTable)
    	.then(function() {
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
		$scope.guestInput = false;
		$scope.constraintInput = true;
	};

	// add bi-directional constraints
	$scope.addConstraint = function(){
		// For 2 dropdowns: Guest in col 1 is 'guest', guest in col 2 is 'enemy'
    // access the constraints array of the guest; if enemy hasn't been added, add it
    if ($scope.guest && $scope.guest.constraints.indexOf($scope.enemy.guestName) === -1) {
			$scope.guest.constraints.push($scope.enemy.guestName);
    }
		if ($scope.enemy && $scope.enemy.constraints.indexOf($scope.guest.guestName) === -1) {
			$scope.enemy.constraints.push($scope.guest.guestName);
		}
		// reset guest and enemy fields
		$scope.guest = '';
		$scope.enemy = '';
	};

  $scope.signout = function() {
  	Auth.signout();
  };
});
