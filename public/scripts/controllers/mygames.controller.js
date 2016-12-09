myApp.controller('MyGamesController', ['$http', '$firebaseAuth', 'DataFactory', function($http, $firebaseAuth, DataFactory) {
  console.log('mygamescontroller running');
  var self = this;
  self.message = "MyGamesController is the best!";
  self.games = [];

  getGames();

  function getGames() {
    $http.get('/mygames')
    .then(function(response) {
      console.log('response.data: ', response.data);
      self.games = response.data;
    });
  }
}]);
