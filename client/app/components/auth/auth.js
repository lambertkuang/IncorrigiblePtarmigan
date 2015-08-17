angular.module('seatly.auth', [])
// Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
.controller('AuthController', function($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function() {
    Auth.signin($scope.user)
      .then(function(token) {
        $window.localStorage.setItem('com.seatly', token);
        $location.path('/guestinput');
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  $scope.signup = function() {
    Auth.signup($scope.user)
      .then(function(token) {
        $window.localStorage.setItem('com.seatly', token);
        $location.path('/guestinput');
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.signout = function() {
    Auth.signout();
  };
});
