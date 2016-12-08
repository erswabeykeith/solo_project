myApp.factory('DataFactory', ['$firebaseAuth', '$http', function($firebaseAuth, $http) {
  console.log("factory running");

  var currentUser = undefined;
  var auth = $firebaseAuth();



function logIn() {
  return auth.$signInWithPopup("google").then(function(firebaseUser) {
    console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
  }).catch(function(error) {
    console.log("Authentication failed: ", error);
    });
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
        url: '/privateData',
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        self.secretData = response.data;
      });
    });
  } else {
    console.log('Not logged in or authorized');
    self.secretData = [];
  }
});

var gameData = {
logIn: function() {
  return logIn();
},

stateChanged: function() {
  return stateChanged();
},

logOut: function() {
  return logOut();
  }
};

return gameData;


}]);
