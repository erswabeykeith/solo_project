myApp.controller('HomeController', ['$http', '$firebaseAuth', 'DataFactory', function($http, $firebaseAuth, DataFactory) {
  console.log('home controller running');


  var self = this;
  var auth = $firebaseAuth();

  // self.currentUser = {};
  // self.newUser = {};

self.logIn = DataFactory.logIn;
self.logOut = DataFactory.logOut;

}]);



  // auth.$onAuthStateChanged(function(firebaseUser){
  //   // self.currentUser = firebaseUser;
  //   if(firebaseUser) {
  //     firebaseUser.getToken().then(function(idToken){
  //       $http({
  //         method: 'GET',
  //         url: '/privateData',
  //         headers: {
  //           id_token: idToken
  //         }
  //       }).then(function(response){
  //         self.secretData = response.data;
  //       });
  //     });
  //   } else {
  //     console.log('Not logged in or authorized');
  //     self.secretData = [];
  //   }
  // });
  //
  // self.logOut = function()
  //   });
  // };
  //
  //
