var myApp = angular.module("myApp", ['ngRoute', 'firebase']);
console.log('angular is working');

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/home', {
    templateUrl: '/views/templates/home.html',
    controller: 'HomeController',
    controllerAs: 'home'
  })
  .when('/mygames' ,{
    templateUrl: '/views/templates/mygames.html',
    controller: 'MyGamesController',
    controllerAs: 'mygames'
  })
  .when('/friendsgames', {
    templateUrl: '/views/templates/friendsgames.html',
    controller: 'FriendsGamesController',
    controllerAs: 'friendsgames'
  })
  .otherwise({
    redirectTo: 'home'
  });
}]);
