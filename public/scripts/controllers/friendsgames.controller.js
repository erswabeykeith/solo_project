myApp.controller('FriendsGamesController', ['$http', '$firebaseAuth', 'DataFactory', function($http, $firebaseAuth, DataFactory) {
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
