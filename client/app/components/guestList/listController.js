angular.module('seatly.list', [])
.controller('listController',['$scope', 'List', function($scope, List) {

  $scope.guests = [];

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

  $scope.init();
  console.log('called init');
}]);