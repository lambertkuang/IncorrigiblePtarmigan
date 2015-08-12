// TODO: Need to validate that the guest name is unique, so you can't add duplicate +1's 
// TODO: Do not allow empty strings to be submitted for the guestName input

angular.module('seatly.guestInput', [])
.controller('guestInputCtrl', function($scope, guestInputFactory){
	$scope.guests = [];

	$scope.guestName = "";
	$scope.friendName = "";
	$scope.enemy = "";
	$scope.showConstraints = false;

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

		$scope.guestName = "";
		$scope.friendName = "";
	};

	$scope.addAllGuests = function(){
		if($scope.guestName.length > 0){
			$scope.addGuest();
		}
		var result = {
			guests: $scope.guests
		};
		console.dir($scope.guests);
    // call a function in our factory with guest arr as input
    return guestInputFactory.addAllGuests(result);
	};

	$scope.showConstraintsView = function(){
		// add whatever guest is left
		$scope.addGuest();
		// called on button click to show the constraints view
		$scope.showConstraints = true;
	};

	$scope.addConstraint = function(){
		// For 2 dropdowns: Guest in col 1 is 'guest', guest in col 2 is 'enemy'
    // access the constraints array of the guest
		$scope.guest.constraints.push($scope.enemy.guestName);
		
		// To create bi-directional constraint listings
		// access the constraints array of the enemy
		$scope.enemy.constraints.push($scope.guest.guestName);

	};

});

		// var guests = $scope.guests;
		// var guest;
		// // find the guest in the guests array by their guestname
		// for(var i = 0; i < guests.length; i++){
		// 	if(guests[i][guestName] === guestName){
		// 		guest = guests[i];
		// 		// return;
		// 	}
		// }
		// // set constraints for our target guest
		// console.log(guests);
		// guest[constraints] = constraints;
		// constraints.push(enemy);
		// console.log(enemy + " pushed to " + guest[guestname] + " constraints");

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
