var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');

router.get('/', function(req, res){
  pg.connect(connectionString, function(err, client, done){
  console.log('req.decodedToken: ', req.decodedToken);
    var userEmail = req.decodedToken.email;
    client.query('SELECT * ' + 'FROM games ' + 'JOIN users_games ON games.id = users_games.game_id ' + 'JOIN users ON users.id = users_games.user_id ' + 'WHERE users.email=$1;', [userEmail], function(err, results){
      done();
      if(err){
        console.log('Error', err);
        res.sendStatus(500);
      } else {
        pg.connect(connectionString, function(err, client, done){
          if(results.rowCount === 0) {
            console.log('No user found with that email. Email: ', req.decodedToken.email);
            res.sendStatus(403);
          } else {
            var clearanceLevel = results.rows[0].clearance_level;
            console.log('clearanceLevel: ', clearanceLevel);
            //a lot can be added here
          }
          res.send(results.rows);
          done();
        });
      }
    });
  });
});

module.exports = router;
