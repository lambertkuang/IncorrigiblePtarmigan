angular.module('seatly.edit', [])
.controller('editController', function($scope, Edit) {
  // TODO turn this into a real guest, not a hardcoded example
  $scope.guest = {
    guestName: 'daft',
    friendName: 'friend!',
    constraints: ['no', 'contraints', 'here'],
    diningTableId: 3
  };

  $scope.editGuest = function()  {
    // format the information in the way the server expects
    // TODO only provide the information that has changed
    var obj = {
      changes: [$scope.guest.guestName, $scope.guest]
    };

    // pass object through to factory
    return Edit.editGuest(obj)
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

});