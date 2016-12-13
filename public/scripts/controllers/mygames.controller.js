myApp.controller('MyGamesController', ['$http', '$firebaseAuth', 'DataFactory', function($http, $firebaseAuth, DataFactory) {
  console.log('mygamescontroller running');
  var self = this;
  self.newGame = {}
  self.games = [];

  getGames();

  function getGames() {
    // does the factory have data?
    // if(DataFactory.gameData() === '') {
      // have the factory go get the data and let us know when it's done
      DataFactory.updateGames().then(function(response){ //was updateGames
        console.log('This is the datafactory respoonse from updateGames', response);
        self.games = DataFactory.gameData();
        console.log("Controller got stuff from the factory: ", self.games);
      });
    // } else {
    //   // Factory already has data, let's use it
    //   self.games = DataFactory.gameData();
    //   console.log("using current data");
    // }

  } //end getgames function


  self.addGame = function() {
  // Give our new object to the factory to store on the server
  console.log(self.newGame);
  DataFactory.addGame(self.newGame)
  .then(function(response) {
    getGames();
  //     console.log('controller add game response ', response);
  //     self.games = DataFactory.gameData(); //timing adjust
    });
  }

}]); //end controller





//     $http.get('/myGames')
//     .then(function(response) {
//       console.log('response.data: ', response.data);
//       self.games = response.data;
//     });
//   }
// }]);
