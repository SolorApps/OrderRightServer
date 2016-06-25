var express = require('express');
var app = express();
var mongoose = require('mongoose');

var config = require('./config');
var setupController = require('./controllers/setupController');
var itemController = require('./controllers/itemController');
var menuController = require('./controllers/menuController');
var restaurantController = require('./controllers/restaurantController');


var port = process.env.PORT || 8080

app.use('/assets', express.static(__dirname + '/public'));

mongoose.connect(config.getDbConnectionString());

setupController(app);
menuController(app);
restaurantController(app);
itemController(app);

app.get('*', function(req, res, next) {
        var err = new Error('oops! something broke');
        err.status = 404;
        next(err);
});
app.use(function(err, req, res, next) {
    console.log(err.status);
    console.log(err.message);
    res.status(err.status || 500).json({ error: err.message});
});

//app.listen(port)
app.listen(port,'172.31.52.14')
