angular.module('seatly.auth', [])
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
.controller('AuthController', function($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function() {
    // console.log(8, 'signin');
    Auth.signin($scope.user)
      .then(function(token) {
        $window.localStorage.setItem('com.seatly', token);
        // maybe need to update path once user signs in
        $location.path('/guestinput');
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  $scope.signup = function() {
    // console.log('21, signup');
    Auth.signup($scope.user)
      .then(function(token) {
        $window.localStorage.setItem('com.seatly', token);
        // maybe need to update path once user signs in
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