//firebase, datafactory, http, and scope are injected. Scope has properties and injecting it here makes the HTML view available to the controller
myApp.controller('FriendsGamesController', ['$http', '$firebaseAuth', 'DataFactory', '$scope', function ($http, $firebaseAuth, DataFactory, $scope) {
  console.log('friendsgamescontroller running');
  var self = this;  //what we are working with (the controller)
  self.newGame = {} //the controller has a property of newGame and is currently equal to an empty object
  self.games = [];  //the object entered will be part of the games array which is currently empty

  getFriendsGames(); //getGames function is called here

  function getFriendsGames() { //getGames function declared here
    DataFactory.getFriendsGames().then(function (response) { //getGames from the datafactory and then when done, give us the response
      console.log('returned to controller from factory', response); //can see what the response is here
      self.games = response; //set our empty array equal to the response we got
      $scope.$apply(); //apply this to the scope so it is accessible in the HTML view
    });
  } //end getgames function


  self.addFriendsGame = function () {  //the controller has a property of addGame which is equal to a function
    DataFactory.addFriendsGame(self.newGame).then(getFriendsGames);  //This function applies addGame to the datafactory and adds the game we put in and when it is done, the getGames function is called
  }

}]); //end controller


// myApp.controller('FriendsGamesController', ['$http', '$firebaseAuth', 'DataFactory', function($http, $firebaseAuth, DataFactory) {
//   console.log('friendsgamescontroller running');
//   var self = this;
//   self.message = "FriendsGamesController is the best!";
//   self.games = [];
//
//   getGames();
//
//   function getGames() {
//     $http.get('/friendsgames')
//     .then(function(response) {
//       console.log('response.data: ', response.data);
//       self.games = response.data;
//     });
//   }
// }]);
