angular.module('seatly.list', [])
.controller('listController',['$scope', 'List', function($scope, List) {

  $scope.guests = [];

  // hardcoded guest for now; will change when 
  // fauxRedirect is working
  $scope.guest = {
    guestName: 'daft',
    friendName: 'friend!',
    constraints: ['no', 'contraints', 'here'],
    diningTableId: 3
  };

  $scope.init = function() {
    List.viewGuests()
    .then(function(allGuests) {
      $scope.guests = allGuests;
      console.log('bound data');
    })
    .catch(function(err) {
      console.log(new Error(err));
    });
  }

  $scope.fauxRedirect = function(guestName) {
    Link.editGuest(guestName)
    .then(function(guest) {
      // hide the list view and unhide the edit view
    })
    .catch(function(err) {
      console.log(new Error(err));
    });
  };

  $scope.editGuest = function()  {
    // format the information in the way the server expects
    // TODO only provide the information that has changed
    var obj = {
      changes: [$scope.guest.guestName, $scope.guest]
    };

    // pass object through to factory
    return Link.editGuest(obj)
    // no matter if error or not, clear fields
    .finally(function(res) {
      // TODO redirect with $location to guestListView
      $scope.guest = {
        guestName: '',
        friendName: '',
        contraints: [],
        diningTableId: null
      }
      return res;
    });
  };

  $scope.init();
}]);