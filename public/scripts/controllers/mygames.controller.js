//firebase, datafactory, http, and scope are injected. Scope has properties and injecting it here makes the HTML view available to the controller
myApp.controller('MyGamesController', ['$http', '$firebaseAuth', 'DataFactory', '$scope', function ($http, $firebaseAuth, DataFactory, $scope) {
  console.log('mygamescontroller running');
  var self = this;  //the game we most recently entered
  self.newGame = {} //the game entered has a property of newGame and is currently equal to an empty object
  self.games = [];  //the object entered will be part of the games array which is currently empty

  getGames(); //getGames function is called here

  function getGames() { //getGames function declared here
        DataFactory.getGames().then(function (response) { //getGames from the datafactory and then when done, give us the response
          console.log('returned to controller from factory', response); //can see what the response is here
          self.games = response; //set our empty object equal to the response we got
          $scope.$apply(); //apply this to the scope so it is accessible in the HTML view
        });
  } //end getgames function


  self.addGame = function () {  //the game that we just added has a property of addGame which is equal to a function
    DataFactory.addGame(self.newGame).then(getGames);  //This function applies addGame to the datafactory and adds the game we put in and when it is done, the getGames function is called
  }

}]); //end controller





















// myApp.controller('MyGamesController', ['$http', '$firebaseAuth', 'DataFactory', function($http, $firebaseAuth, DataFactory) {
//   console.log('mygamescontroller running');
//   var self = this;
//   self.newGame = {}
//   self.games = [];
//
//   getGames();
//
//   function getGames() {
//     // does the factory have data?
//     // if(DataFactory.gameData() === '') {
//       // have the factory go get the data and let us know when it's done
//       DataFactory.updateGames().then(function(response){ //was updateGames
//         self.games = DataFactory.gameData();
//         console.log("Controller got stuff from the factory: ", self.games);
//       });
//     // } else {
//     //   // Factory already has data, let's use it
//     //   self.games = DataFactory.gameData();
//     //   console.log("using current data");
//     // }
//
//   } //end getgames function
//
//
//   self.addGame = function() {
//   // Give our new object to the factory to store on the server
//   console.log(self.newGame);
//   DataFactory.addGame(self.newGame)
//   .then(function(response) {
//       console.log('controller add game response ', response);
//       self.games = DataFactory.gameData(); //timing adjust
//     });
//   }
//
// }]); //end controller
//
//
//
//
//
// //     $http.get('/myGames')
// //     .then(function(response) {
// //       console.log('response.data: ', response.data);
// //       self.games = response.data;
// //     });
// //   }
// // }]);
