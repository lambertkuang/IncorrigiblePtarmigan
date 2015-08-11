angular.module('seatly.edit', [])
.controller('editController', function($scope, Edit) {
  $scope.guest = {
    guestName: 'example',
    friendName: 'friend!',
    constraints: ['no', 'contraints', 'here'],
    diningTableId: 3
  };

  $scope.editGuest = function()  {
    var obj = {
      changes: [$scope.guest.guestName, $scope.guest]
    };

    return Edit.editGuest(obj)
    .then(function(res) {
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