angular.module('seatly.list', [])
.controller('listController',['$scope', 'List', 'Auth', 'guestInputFactory', function($scope, List, Auth, guestInputFactory) {
  // change scope variables to center around
  // a list of tables with guests in those tables
  $scope.diningTbls = [];

  // guest currently being edited
  $scope.guest = {};

  // toggle based on the state we're in: list view or edit; tied to ng-hide
  $scope.inEdit = false;

  // render all of the guests in the table
  $scope.init = function() {
    List.viewGuests()
    // get a list of tables under .data
    .then(function(allGuests) {
      $scope.diningTbls = allGuests.data;
      console.log(' in init');
    })
    .catch(function(err) {
      console.log(new Error(err));
    });
  };

  // find a particular guest and go into edit view
  $scope.fauxRedirect = function(guestName) {
    // NOTE: NOT MVP. uncomment when you
    // want to keep working on it

    List.getGuest(guestName)
    .then(function(guest) {
      console.log(guest.data);
      $scope.guest = guest.data;
      // hide the list view and unhide the edit view
      $scope.inEdit = true;
      console.log($scope.guest);
    })
    .catch(function(err) {
      console.log(new Error(err));
    });
  };

  // save the edited information to db and go into list view
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
      };
      $scope.inEdit = false;
      $scope.init();
      return res;
    });
  };

  // don't save changes made to guest, but return to List View
  $scope.reverseRedirect = function() {
    $scope.inEdit = false;
  };

  // delete current guest and remove all other reference to
  // them in other guests' plus-one or constraint fields
  $scope.deleteGuest = function() {
    List.deleteGuest($scope.guest)
    .then(function() {
      // must go through algorithm again if you delete guests
      $scope.reshuffle();
      $scope.reverseRedirect();
    });
  };

  // resort dining tables
  $scope.reshuffle = function() {
    var pplPerTable = $scope.diningTbls[0].guestsAtTable;
    guestInputFactory.sortGuests(pplPerTable)
    .then(function() {
      $scope.init();
    })
    .catch(function(err) {
      console.log(new Error(err));
    });
  };

  // signout! on multiple pages and not very DRY, but functional
  $scope.signout = function() {
    Auth.signout();
  };

  $scope.init();
}]);
