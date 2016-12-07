// var admin = require("firebase-admin");
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var privateData = require('./routes/private-data');
var pgConnection = require('./modules/pg-connection');
var mygames = require('./routes/mygames');
var friendsgames = require('./routes/friendsgames');
var port = 3000;

app.set("port", (process.env.PORT || port));

app.get('/home', function(req, res) {
    res.send("hello from the server");
});

app.use(express.static(path.resolve('./public')));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

app.use(decoder.token);

app.use('/mygames', mygames);
app.use('/friendsgames', friendsgames);
app.use('/privateData', privateData);



pgConnection.connect();

app.listen(app.get("port"), function(){
    console.log("Server up and running on Port", port);
});
