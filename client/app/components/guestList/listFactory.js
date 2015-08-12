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
      url: '/one',
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
      url: '/create',
      data: guestObj
    });
  };

  return {
    'viewGuests': viewGuests,
    'getGuest': getGuest,
    'editGuest': editGuest
  };

});