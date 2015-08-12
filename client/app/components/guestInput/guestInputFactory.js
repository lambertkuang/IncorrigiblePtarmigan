angular.module('seatly.guestInput')
.factory('guestInputFactory', function($http){
	var addAllGuests = function(guestsArray){
		return $http({
			method: 'POST',
			url: '/create',
			data: guestsArray
		});
	};

// This is not needed here - PUT reqs belong on edit page
	// var addConstraints = function(guest, changesArray){
	// 	console.log("addConstraints");
	// 	return $http({
	// 		method: 'PUT',
	// 		// TODO: update this url
	// 		url: '/create',
	// 		data: guest,
	// 		params: {changes: changesArray}
	// 	});
	// };

	return {
		'addAllGuests': addAllGuests,
	};

});

