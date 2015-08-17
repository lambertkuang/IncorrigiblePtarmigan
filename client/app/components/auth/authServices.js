angular.module('seatly.authServices', [])
  .factory('Auth', function($http, $location, $window) {
    // Responsible for authenticating our user by exchanging username and password for a JWT
    // from the server. JWT is then stored in localStorage as 'com.shortly'.
    // To see token from server: Signin/signup -> open devtools -> resources -> localStorage
    var signin = function(user) {
      return $http({
        method: 'POST',
        url: '/user/signin',
        data: user
      })
      .then(function(resp) {
        return resp.data.token;
      });
    };

    var signup = function(user) {
      return $http({
        method: 'POST',
        url: '/user/signup',
        data: user
      })
      .then(function(resp) {
        return resp.data.token;
      });
    };

    var isAuth = function() {
      return !!$window.localStorage.getItem('com.seatly');
    };

    var signout = function() {
      $window.localStorage.removeItem('com.seatly');
      $location.path('/signin');
    };


    return {
      signin: signin,
      signup: signup,
      signout: signout,
      isAuth: isAuth
    };
  });