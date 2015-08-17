angular.module('seatly', [
	'seatly.guestInput',
	'seatly.auth',
  'seatly.authServices',
  'seatly.list',
  'ngRoute'
])
  .config(function($routeProvider, $locationProvider, $httpProvider){
    $routeProvider
      .when('/signin', {
        templateUrl: 'app/components/auth/signinView.html',
        controller: 'AuthController'
      })
      .when('/signup', {
        templateUrl: 'app/components/auth/signupView.html',
        controller: 'AuthController'
      })
      .when('/list', {
        templateUrl: 'app/components/guestList/listView.html',
        controller: 'listController'
      })
      .when('/guestinput', {
        templateUrl: 'app/components/guestInput/guestInputView.html',
        controller: 'guestInputCtrl',
        controllerAs: 'guestInput'
      })
      .otherwise({
        templateUrl: 'app/components/auth/signinView.html',
        controller: 'AuthController'
      });

    $httpProvider.interceptors.push('AttachTokens');
  })
  .factory('AttachTokens', function($window) {
    var attach = {
      request: function(obj) {
        var jwt = $window.localStorage.getItem('com.seatly');
        if (jwt) {
          obj.headers['x-access-token'] = jwt;
        }
        obj.headers['Allow-Control-Allow-Origin'] = '*';
        return obj;
      }
    };

    return attach;
  })
  .run(function($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function(evt, next, current) {
      if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
        $location.path('/signin');
      }
    });
  });
