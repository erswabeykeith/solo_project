myApp.factory('DataFactory', ['$firebaseAuth', '$http', function($firebaseAuth, $http) {
  console.log("factory running");

  var currentUser = undefined;
  var auth = $firebaseAuth();
  var gameData = undefined;


  function logIn() {
    return auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  // Get all the games from the server
  function getGames() {
    console.log('factory getting games');
    if(firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/myGames',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          gameData = response.data;
        });
      });
    } else {
      console.log('Not logged in or authorized');
      gameData = undefined;
    }
  };

// Get all the games from the server again after a new one has been added
  function updateGames() {
    console.log('factory getting games again');
    if(firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/myGames',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          gameData = response.data;
        });
      });
    } else {
      console.log('Not logged in or authorized');
      gameData = undefined;
    }
  };

  function logOut() {
    return auth.$signOut().then(function(){
      console.log('logged out');

    });
  };

  auth.$onAuthStateChanged(function(firebaseUser){
    // self.currentUser = firebaseUser;
    if(firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/myGames',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          gameData = response.data;
        });
      });
    } else {
      console.log('Not logged in or authorized');
      gameData = undefined;
    }
  });

  var api = {
    logIn: function() {
      return logIn();
    },
    gameData: function() {
      // return our array to the Controller!
      return gameData;
    },
    updateGames: function() {
      // return our Promise to the Controller!
      return  updateGames();
    },
    addGame: function(newGame) {
      // return our Promise to the Controller!
      return addGame(newGame)
    },
    getGames: function(gameData) {
      // return our Promise to the Controller!
      return getGames(gameData)
    },
    stateChanged: function() {
      return stateChanged();
    },

    logOut: function() {
      return logOut();
    }
  };

  return api;


}]);
