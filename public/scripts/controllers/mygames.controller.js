myApp.controller('MyGamesController', ['$http', '$firebaseAuth', 'DataFactory', function($http, $firebaseAuth, DataFactory) {
  console.log('mygamescontroller running');
  var self = this;
  self.newGame = {}
  self.games = [];

  getGames();

  function getGames() {
    // does the factory have data?
    if(DataFactory.gameData() === '') {
      // have the factory go get the data and let us know when it's done
      DataFactory.updateGames().then(function(response){
        self.games = DataFactory.gameData();
        console.log("Controller got stuff from the factory: ", self.games);
      });
    } else {
      // Factory already has data, let's use it
      self.games = DataFactory.gameData();
    }

  }

  self.addGame = function() {
  // Give our new object to the factory to store on the server
  DataFactory.addGame(self.newGame)
  .then(function(response) {
      console.log('controller add game response ', response);
      self.games = DataFactory.gameData();
    });
  }

}]);





//     $http.get('/myGames')
//     .then(function(response) {
//       console.log('response.data: ', response.data);
//       self.games = response.data;
//     });
//   }
// }]);
