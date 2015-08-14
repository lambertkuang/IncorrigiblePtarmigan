angular.module('seatly.list', [])
.controller('listController',['$scope', 'List', 'Auth', function($scope, List, Auth) {
  // change scope variables to center around
  // a list of tables with guests in those tables
  $scope.diningTbls = [];

  // the guest currently being edited
  $scope.guest = {};

  // this will toggle based on the state we're in:
  // list view or edit. It's tied to ng-hide.
  $scope.inEdit = false;

  // render all of the guests in the table
  $scope.init = function() {
    List.viewGuests()
    // this function will get a list of tables under .data
    .then(function(allGuests) {
      $scope.diningTbls = allGuests.data;
    })
    .catch(function(err) {
      console.log(new Error(err));
    });
  };

  // find a particular guest and go into edit view
  $scope.fauxRedirect = function(guestName) {
    // NOTE: NOT MVP. uncomment when you
    // want to keep working on it

    // List.getGuest(guestName)
    // .then(function(guest) {
    //   console.log(guest.data);
    //   $scope.guest = guest.data;
    //   // hide the list view and unhide the edit view
    //   $scope.inEdit = true;
    // })
    // .catch(function(err) {
    //   console.log(new Error(err));
    // });
  };

  // save the edited information to db
  // and go into list view
  $scope.editGuest = function()  {
    // format the information in the way the server expects
    // TODO only provide the information that has changed
    // TODO change information of any guest affected by this change
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

  $scope.signout = function() {
    Auth.signout();
  };

  $scope.init();
}]);