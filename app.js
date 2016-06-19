var express = require('express');
var app = express();
var mongoose = require('mongoose');
// needed to connect to database
// app.js is in root folder so './config means the folder (not file config.json)
// so we run index.js file
var config = require('./config');
//needed fo seeding data
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');

var port = process.env.PORT || 8080
// this is so that all our assest calls go to /public folder (redirect basically)
app.use('/assets', express.static(__dirname + '/public'));
//this is for the ejs template that has html like code
app.set('view engine', 'ejs');
// needed to connect to databse using mongoose
mongoose.connect(config.getDbConnectionString());
setupController(app);
apiController(app);
app.listen(port)
