angular.module('seatly.auth', [])
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
.controller('AuthController', function($scope, $window, $location, Auth) {
  $scope.user = {};

  // ANOTHER developer boolean!
  // same deal as in app.module.js
  var developer = true;

  $scope.signin = function() {
    Auth.signin($scope.user)
      .then(function(token) {
        if (!developer) {
          $window.localStorage.setItem('com.seatly', token);
        }
        // maybe need to update path once user signs in
        $location.path('/guestinput');
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.signup = function() {
    Auth.signup($scope.user)
      .then(function(token) {
        if (!developer) {
          $window.localStorage.setItem('com.seatly', token);
        }
        // maybe need to update path once user signs in
        $location.path('/guestinput');
      })
      .catch(function(error) {
        console.error(error);
      });
  };
});