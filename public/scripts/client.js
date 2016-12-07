var myApp = angular.module("myApp", ['ngRoute']);

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

myApp.controller('HomeController', function($firebaseAuth, $http) {
  console.log('home controller running');
  var auth = $firebaseAuth();
  var self = this;
  self.message = "Home controller is the best!";
  self.logIn = function(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

});

myApp.controller('MyGamesController', function() {
  console.log('MyGamesController running');
  var self = this;
  self.message = "MyGamesController is the best!";

});

myApp.controller('FriendsGamesController', ["$http", function($http) {
  console.log('lFriendsGamesController running');
  var self = this;
  self.message = "FriendsGamesController is the best!";
  self.games = [];

  getGames();

  function getGames() {
    $http.get('/friendsgames')
      .then(function(response) {
        console.log('response.data: ', response.data);
        self.games = response.data;
      });
    }
}]);
