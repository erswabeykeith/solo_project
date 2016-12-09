var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');
var currentUser = {};

router.get('/', function(req, res){
  pg.connect(connectionString, function(err, client, done){
  // console.log('req.decodedToken: ', req.decodedToken);
    var userEmail = req.decodedToken.email;
    client.query('SELECT * FROM games ' +
    'JOIN users_games ON games.id = users_games.game_id ' +
    'JOIN users ON users.id = users_games.user_id ' + 'WHERE users.email=$1;', [userEmail], function(err, results){
      done();
      if(err){
        console.log('Error', err);
        res.sendStatus(500);
      } else {
          if(results.rowCount === 0) {
            console.log('No user found with that email. Email: ', req.decodedToken.email);
            res.sendStatus(403);
          } else {
            //Put query in that inserts them into the database
            //a lot can be added here
              console.log(results.rows);
              res.send(results.rows);

          }


      }
    });
  });
});

module.exports = router;
