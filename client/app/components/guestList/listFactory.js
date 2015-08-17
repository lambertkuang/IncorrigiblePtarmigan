angular.module('seatly.list')
.factory('List', [ '$http', '$q', function($http, $q) {
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
      url: '/guest/edit',
      data: guestObj
    });
  };

// test object: { "changes": [ "Jennie Kim", { "guestName": "JK", "friendName": "Eric"} ]}
// note: this function doesn't seem very DRY, but hopefully functional
  var deleteGuest = function(guestObj) {
    return $q(function(resolve, reject) {
      // first, remove any enemy ties they had
      for (var i = 0; i < guestObj.constraints.length; i++) {
        getGuest(guestObj.constraints[i])
        .then(function(constrObj) {
          var guestIndex = constrObj.data.constraints.indexOf(guestObj.guestName);
          // this should always be fine but just in case:
          console.log('CONSTRAINT OF GUEST:', constrObj.data);
          if (guestIndex !== -1) {
            constrObj.data.constraints.splice(guestIndex, 1);
            var changedObj = {'changes': [constrObj.data.guestName, {'constraints': constrObj.data.constraints}]};

            editGuest(changedObj)
            .then(function() {
              console.log('saved something');
              resolve();
            })
            .catch(function(err) {
              reject(new Error(err));
            }); // end of editGuest
          }
        })
        .catch(function(err) {
          console.log(new Error(err));
        }); // end of getGuest
      }
      // if there are no constraints, go on to next section
      resolve();
    }) // end of q function
    // then remove any +1 ties they had
    .then(function(res) {
      if (guestObj.friendName) {
        return $http({
          method: 'PUT',
          url: '/guest/edit',
          data: {'changes': [guestObj.friendName, { 'friendName' : ''}]}
        })
        // finally, delete the original guest
        .then(function() {
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
      // if there are no plus-1 ties, still delete original guest
      // not DRY but functional 
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
    }, function(err) {
      console.log(new Error(err));
    });

  };

  return {
    'viewGuests': viewGuests,
    'getGuest': getGuest,
    'editGuest': editGuest,
    'deleteGuest': deleteGuest
  };

}]);
