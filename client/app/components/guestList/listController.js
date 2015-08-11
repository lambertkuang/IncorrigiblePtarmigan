angular.module('seatly.list', [])
.controller('listController', function($scope, List) {

  $scope.guests = [];

  var init = function() {
    List.viewGuests()
    .then(function(allGuests) {
      $scope.guests = allGuests;
    })
    .catch(function(err) {
      console.log(new Error(err));
    });
  }

  init();
});