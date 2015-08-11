angular.module('seatly.edit')
.factory('Edit', function($http) {

  var editGuest = function(guestObj) {
    return $http({
      method: 'PUT',
      url: '/edit',
      data: guestObj
    });
  }

  return {
    'editGuest': editGuest
  };

});