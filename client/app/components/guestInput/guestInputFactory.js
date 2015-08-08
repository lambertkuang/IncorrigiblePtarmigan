angular.module('seatly.guestInput')
.factory('guestInputFactory', function($http){
	var addAllGuests = function(guestsArray){
		return $http({
			method: 'POST',
			url: '/create',
			data: guestsArray
		});
	};

	return {
		'addAllGuests': addAllGuests
	};

});
