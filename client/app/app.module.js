angular.module('seatly', [
	'seatly.guestInput',
	'seatly.auth',
	'seatly.edit',
	'seatly.start',
	'seatly.constraintInput',
  'ngRoute'
])
  .config(function($routeProvider, $locationProvider, $httpProvider){
    $routeProvider
      .when('/signin', {
        templateUrl: 'components/auth/signinView.html',
        controller: 'AuthController'
      })
      .when('/signup', {
        templateUrl: 'components/auth/signupView.html',
        controller: 'AuthController'
      })
      .when('/', {
        // default view before we implement auth will be edit page
        templateUrl: 'components/edit/editView.html',
        controller: 'editController',
        controllerAs: 'edit'
      })
      .when('/edit', {
        templateUrl: 'components/edit/editView.html',
        controller: 'editController',
        controllerAs: 'edit'
      })
      .when('/guestinput', {
        templateUrl: 'components/guestInput/guestInputView.html',
        controller: 'guestInputCtrl',
        controllerAs: 'guestInput'
      });
    $locationProvider.html5Mode(true);
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

