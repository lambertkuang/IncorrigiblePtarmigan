angular.module('seatly.list')
.factory('List', function($http) {
  var viewGuests = function() {
    return $http({
      method: 'GET',
      url: '/create'
    });
  };

  return {
    'viewGuests': viewGuests
  };

});