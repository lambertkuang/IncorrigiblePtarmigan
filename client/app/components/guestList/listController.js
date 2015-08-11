angular.module('seatly.list', [])
.controller('listController',['$scope', 'List', function($scope, List) {

  // all the guests; for use in list
  $scope.guests = [];

  // hardcoded guest for now; will change when 
  // fauxRedirect is working
  // the guest currently being edited
  $scope.guest = {
    guestName: 'daft',
    friendName: 'friend!',
    constraints: ['no', 'contraints', 'here'],
    diningTableId: 3
  };

  // this will toggle based on the state we're in:
  // list view or edit. It's tied to ng-hide.
  $scope.inEdit = false;

  // render all of the guests in the table
  $scope.init = function() {
    List.viewGuests()
    .then(function(allGuests) {
      $scope.guests = allGuests;
      console.log('bound data');
    })
    .catch(function(err) {
      console.log(new Error(err));
    });
  };

  // find a particular guest and go into edit view
  $scope.fauxRedirect = function(guestName) {
    List.getGuest(guestName)
    .then(function(guest) {
      console.log(guest.data);
      $scope.guest = guest.data;
      // hide the list view and unhide the edit view
      $scope.inEdit = true;
    })
    .catch(function(err) {
      console.log(new Error(err));
    });
  };

  // save the edited information to db
  // and go into list view
  $scope.editGuest = function()  {
    // format the information in the way the server expects
    // TODO only provide the information that has changed
    var obj = {
      changes: [$scope.guest.guestName, $scope.guest]
    };

    // pass object through to factory
    return List.editGuest(obj)
    // no matter if error or not, clear fields
    .finally(function(res) {
      // TODO redirect with $location to guestListView
      $scope.guest = {
        guestName: '',
        friendName: '',
        contraints: [],
        diningTableId: null
      }
      $scope.inEdit = false;
      $scope.init();
      return res;
    });
  };

  $scope.init();
}]);