var myApp = angular.module("myApp", ['ngRoute', 'firebase']);

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

  self.currentUser = {};
  self.newUser = {};

  self.message = "Home controller is the best!";

  self.logIn = function(){
    console.log("you clicked on login");
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      if(firebaseUser) {
        firebaseUser.user.getToken().then(function(idToken){
          $http({
            method: 'GET',
            url: '/privateData',
            headers: {
              id_token: idToken
            }
          })
          .then(function(response){
            self.secretData = response.data;
            console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
          })
          .catch(function(error) {
            console.log("Authentication failed: ", error);
            self.secretData = [];
          });
        });


      }
      else {
        console.log('Not logged in or authorized');
      }
    });
  }; // end self.logIn

  auth.$onAuthStateChanged(function(firebaseUser){
    self.currentUser = firebaseUser;
    if(firebaseUser) {
    } else {
      console.log('Not logged in or authorized')
    }
  });
});

myApp.controller('MyGamesController', function() {
  console.log('mygames controller running');
  var self = this;
  self.message = "MyGamesController is the best!";



  // function getGames() {
  //   $http.get('/friendsgames')
  //   .then(function(response) {
  //     console.log('response.data: ', response.data);
  //     self.games = response.data;
  //   });
  // }

});

myApp.controller('FriendsGamesController', ["$http", function($http) {
  console.log('friendsgamescontroller running');
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
