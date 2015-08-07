angular.module('seatlyRoutes', [])
  .config(function($routeProvide, $locationProvider){
    $routeProvider
      .when('/', {
        // default view before we implement auth will be edit page
        // for now use the guestInput view
        templateUrl: 'components/guestInput/guestInputView.html',
        controller: 'editController',
        controllerAs: 'edit'
      })
      .when('/guestinput', {
        templateUrl: 'components/guestInput/guestInputView.html',
        controller: 'guestInputController',
        controllerAs: 'guestInput'
      });
      $locationProvider.html5Mode(true);
  });