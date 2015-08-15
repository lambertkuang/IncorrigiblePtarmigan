angular.module('seatly.list')
.factory('List', function($http) {
  var viewGuests = function() {
    return $http({
      method: 'GET',
      // change this to /tables/get
      url: '/tables/get'
    });
  };

  var getGuest = function(guestName) {
    return $http({
      method: 'POST',
      url: '/guest/one',
      data: {'name': guestName}
    }).then(function(guest) {
      return guest;
    })
    .catch(function(err) {
      console.log(err);
    });
  };

  var editGuest = function(guestObj) {
    return $http({
      method: 'PUT',
      url: '/guest/create',
      data: guestObj
    });
  };

  var deleteGuest = function(guestObj) {
    return $http({
      method: 'POST',
      url: '/guest/delete',
      data: {'name': guestObj.guestName}
    })
    .then(function(deletedGuest) {
      console.log('We MADE IT:', deletedGuest);
      // find any plus ones
      // find any constraint matches
    });
  };

  return {
    'viewGuests': viewGuests,
    'getGuest': getGuest,
    'editGuest': editGuest,
    'deleteGuest': deleteGuest
  };

});