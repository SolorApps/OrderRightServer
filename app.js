var express = require('express');
var app = express();
var mongoose = require('mongoose');

var config = require('./config');
var setupController = require('./controllers/setupController');

var port = process.env.PORT || 8080

app.use('/assets', express.static(__dirname + '/public'));

mongoose.connect(config.getDbConnectionString());

setupController(app);

app.listen(port)
