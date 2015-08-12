angular.module('seatly.authServices', [])
  .factory('Auth', function($http, $location, $window) {
    // it is responsible for authenticating our user
    // by exchanging the user's username and password
    // for a JWT from the server
    // that JWT is then stored in localStorage as 'com.shortly'
    // after you signin/signup open devtools, click resources,
    // then localStorage and you'll see your token from the server
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