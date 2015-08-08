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
				"friendName": $scope.guestName,
				"diningTableId": -1,
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