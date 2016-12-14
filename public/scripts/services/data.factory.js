myApp.factory('DataFactory', ['$firebaseAuth', '$http', function($firebaseAuth, $http) {
  console.log("factory running");

  var currentUser = null;  //currentUser is set to null
  var auth = $firebaseAuth(); //auth is set to firebaseAuth

  //Log in function
  function logIn() { //function logIn is declared (which will be triggered when the login button is clicked on the view)
    return auth.$signInWithPopup("google").then(function(firebaseUser) { //retun the auth popup window with google then pass the firebase user in as a parameter for the function
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName); //display the firebase user name
    }).catch(function(error) { //function that logs the error
      console.log("Authentication failed: ", error); //error displayed
    });
  };

  // Get all the games from the server
  function getGames() {  //function getGames is displayed
    console.log('getting games');
    return currentUser.getToken().then(function(idToken){ //return the token of the current user and when done, pass that token to the function as a parameter
      return $http({  //return the get request
        method: 'GET',  //using GET
        url: '/myGames',
        headers: {
          id_token: idToken
        }
      }).then(function(response){ //then when done, use the response as a parameter in the function
        return response.data; //then when done, use the response as a parameter in the function
      });
    });
  };

  //Add a Game
  function addGame(newGame) { //function addGame is declared and is passed the parameter of new game
    console.log("Adding game: ", newGame) //log the new game
    if(currentUser) {  //if logged in as the user from the login
      return currentUser.getToken().then(function(idToken){ //return the token of that user and pass it to the function as a parameter
        return $http({  //return the post request
          method: 'POST',  //using POST
          url: '/myGames',
          data: newGame,
          headers: {
            id_token: idToken
          }
        }).then(function(response){ //then when done, use the response as a parameter in the function
          return response.data; //return data of response
        });
      });
    } else { //if not logged in as user from log
      console.log('Not logged in or authorized');  //log this
    }
  };

  // Get all friends' games from the server
  function getFriendsGames() {  //function getGames is displayed
    console.log('getting friends games');
    return currentUser.getToken().then(function(idToken){ //return the token of the current user and when done, pass that token to the function as a parameter
      return $http({  //return the get request
        method: 'GET',  //using GET
        url: '/friendsgames',
        headers: {
          id_token: idToken
        }
      }).then(function(response){ //then when done, use the response as a parameter in the function
        return response.data; //then when done, use the response as a parameter in the function
      });
    });
  };

  //Add a friend's Game
  function addFriendsGame(newGame) { //function addGame is declared and is passed the parameter of new game
    console.log("Adding friend's game: ", newGame) //log the new game
    if(currentUser) {  //if logged in as the user from the login
      return currentUser.getToken().then(function(idToken){ //return the token of that user and pass it to the function as a parameter
        return $http({  //return the post request
          method: 'POST',  //using POST
          url: '/friendsgames',
          data: newGame,
          headers: {
            id_token: idToken
          }
        }).then(function(response){ //then when done, use the response as a parameter in the function
          return response.data; //return data of response
        });
      });
    } else { //if not logged in as user from log
      console.log('Not logged in or authorized');  //log this
    }
  };

  function logOut() { //function logOut is declared (which will be triggered when the logout button is clicked on the view)
    return auth.$signOut().then(function(){
      console.log('logged out');
    });
  };

  auth.$onAuthStateChanged(function(firebaseUser){  //auth state changed function declared and passed parameter firebase user
    currentUser = firebaseUser; //set currentUser equal to firebaseUser
    if(!firebaseUser) { // if firebaseuer is null or undefined (isn't an object) run next line of code
    console.log('Not logged in or authorized');  //then display this console log
  }
});



//Shares functions so they can be accessible to controllers
var api = {
  logIn: function() {
    return logIn();  //return what the login function returns
  },
  getGames: function() {
    // return our Promise to the Controller!
    return getGames();
  },
  addGame: function(newGame) {
    // return our Promise to the Controller!
    return addGame(newGame)
  },
  getFriendsGames: function() {
    // return our Promise to the Controller!
    return getFriendsGames();
  },
  addFriendsGame: function(newGame) {
    // return our Promise to the Controller!
    return addFriendsGame(newGame)
  },
  logOut: function() {
    return logOut();
  }
};

return api; //Factory shares this api function


}]);






























// myApp.factory('DataFactory', ['$firebaseAuth', '$http', function($firebaseAuth, $http) {
//   console.log("factory running");
//
//   var currentUser = {};
//   var auth = $firebaseAuth();
//   var gameData = undefined;
//   //updateGames();
//
//   function logIn() {
//     return auth.$signInWithPopup("google").then(function(firebaseUser) {
//       currentUser = firebaseUser;
//       console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
//     }).catch(function(error) {
//       console.log("Authentication failed: ", error);
//     });
//   };
//
//   // Get all the games from the server
//   function getGames() {
//     console.log('factory getting games');
//     if(currentUser) {
//       currentUser.user.getToken().then(function(idToken){
//         $http({
//           method: 'GET',
//           url: '/myGames',
//           headers: {
//             id_token: idToken
//           }
//         }).then(function(response){
//           gameData = response.data;
//         });
//       });
//     } else {
//       console.log('Not logged in or authorized');
//       gameData = undefined;
//     }
//   };
// //Add a Game
//   function addGame(newGame) {
//     console.log('factory getting games');
//     console.log(currentUser);
//     console.log(newGame);
//     if(currentUser) {
//       return currentUser.getToken().then(function(idToken){
//         console.log("here");
//         console.log(newGame);
//         $http({
//           method: 'POST',
//           url: '/myGames',
//           data: newGame,
//           headers: {
//             id_token: idToken
//           }
//         }).then(function(response){
//           console.log(newGame);
//           gameData = response.data;
//           console.log(newGame);
//         });
//       });
//     } else {
//       console.log('Not logged in or authorized');
//       gameData = undefined;
//     }
//   };
//
// // Get all the games from the server again after a new one has been added
//   function updateGames() {
//     console.log('factory getting games again');
//     if(currentUser) {
//       firebaseUser.getToken().then(function(idToken){
//         $http({
//           method: 'GET',
//           url: '/myGames',
//           headers: {
//             id_token: idToken
//           }
//         }).then(function(response){
//           gameData = response.data;
//         });
//       });
//     } else {
//       console.log('Not logged in or authorized');
//       gameData = undefined;
//     }
//   };
//
//   function logOut() {
//     return auth.$signOut().then(function(){
//       console.log('logged out');
//
//     });
//   };
//
// //This is the only function that works
//   auth.$onAuthStateChanged(function(firebaseUser){
//     currentUser = firebaseUser;
//     if(firebaseUser) {
//       firebaseUser.getToken().then(function(idToken){
//         $http({
//           method: 'GET',
//           url: '/myGames',
//           headers: {
//             id_token: idToken
//           }
//         }).then(function(response){
//           gameData = response.data;
//         });
//       });
//     } else {
//       console.log('Not logged in or authorized');
//       gameData = undefined;
//     }
//   });
//
//   var api = {
//     logIn: function() {
//       return logIn();
//     },
//     gameData: function() {
//       // return our array to the Controller!
//       return gameData;
//     },
//     updateGames: function() {
//       // return our Promise to the Controller!
//       return  updateGames();
//     },
//     addGame: function(newGame) {
//       // return our Promise to the Controller!
//       return addGame(newGame)
//     },
//     getGames: function(gameData) {
//       // return our Promise to the Controller!
//       return getGames(gameData)
//     },
//     stateChanged: function() {
//       return stateChanged();
//     },
//
//     logOut: function() {
//       return logOut();
//     }
//   };
//
//   return api;
//
//
// }]);
