angular.module('seatly.list')
.factory('List', function($http) {
  var viewGuests = function() {
    return $http({
      method: 'GET',
      url: '/create'
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
      url: '/edit',
      data: guestObj
    });
  };

  return {
    'viewGuests': viewGuests,
    'getGuest': getGuest,
    'editGuest': editGuest
  };

});