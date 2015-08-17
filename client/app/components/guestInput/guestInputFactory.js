angular.module('seatly.guestInput')
.factory('guestInputFactory', function($http) {
	var addAllGuests = function(guestsArray) {
		return $http({
			method: 'POST',
			url: '/guest/create',
			data: guestsArray
		});
	};

	var sortGuests = function(tableSize) {
		return $http({
			method: 'POST',
			url: '/tables/sort',
			data: {'numPerTable': tableSize}
		});
	};

	return {
		'addAllGuests': addAllGuests,
		'sortGuests': sortGuests
	};

});
