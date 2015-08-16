angular.module('seatly.list')
.factory('List', [ '$http', function($http) {
  var viewGuests = function() {
    return $http({
      method: 'GET',
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

// test object: { "changes": [ "Jennie Kim", { "guestName": "JK", "friendName": "Eric"} ]}
// note: this function doesn't seem very DRY, but hopefully functional
  var deleteGuest = function(guestObj) {
    // first remove any +1 ties they had
    if (guestObj.friendName) {
      return $http({
        method: 'PUT',
        url: '/guest/edit',
        data: {'changes': [guestObj.friendName, { 'friendName' : ''}]}
      }) // then delete them
      .then(function() {
        // delete the guest
        return $http({
          method: 'POST',
          url: '/guest/delete',
          data: {'name': guestObj.guestName}
        })
        .then(function() {
        })
        .catch(function(err) {
          console.log(new Error(err));
        });
      })
      .catch(function(err) {
        console.log(new Error(err));
      })
    } else {
      return $http({
        method: 'POST',
        url: '/guest/delete',
        data: {'name': guestObj.guestName}
      })
      .then(function() {
      })
      .catch(function(err) {
        console.log(new Error(err));
      });
    }
  };

  return {
    'viewGuests': viewGuests,
    'getGuest': getGuest,
    'editGuest': editGuest,
    'deleteGuest': deleteGuest
  };

}]);
