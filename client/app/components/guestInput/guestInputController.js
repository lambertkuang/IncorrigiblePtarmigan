// TODO: Need to validate that the guest name is unique, so you can't add duplicate +1's 
// TODO: Do not allow empty strings to be submitted for the guestName input

angular.module('seatly.guestInput', [])
.controller('guestInputCtrl', function($scope, guestInputFactory){
	$scope.guests = [];

	$scope.guestName = "";
	$scope.friendName = "";

	$scope.addGuest = function(){

		var guest = {
			"guestName": $scope.guestName,
			"friendName": $scope.friendName,
			"diningTableId": -1,
			"constraints": []
		};
		$scope.guests.push(guest);

		if($scope.friendName){
			var newGuest = {
				"guestName": $scope.friendName,
				// NOTE: We may want to change the logic here. User does not 'count' the plus-one of a primary guest
				// in the same way as she would a primary guest. A plus-one of a primary guest thus should not have
				// their own plus-one property. Either this property should be blank, or set to a value that indicates
				// that this guest is a plus-one (i.e. friendName: "Plus-one of " + $scope.guestName )
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
		$scope.addGuest();
		var result = {
			guests: $scope.guests
		};
		console.dir($scope.guests);
    // call a function in our factory with guest arr as input
    return guestInputFactory.addAllGuests(result);
	};

});