var Restaurant = require('../models/restaurantModel');

module.exports = function(app) {

    // app.use(function(err, req, res, next) {
    //     //console.log('err status');
    //     //console.log(err.status);
    //     //console.log('myerr');
    //     //console.log(err.message);
    //     //res.status(err.status || 500);
    //     res.json(err.status, { error: err.status });
    // });
    
    app.get('/api/getRestaurant', function(req, res, next){    
        restaurantQuery = Restaurant;
        console.log('query length' + req.query);
        if (req.query.id){
            restaurantQuery = restaurantQuery.find({ _id:req.query.id });
            if (req.query.name){
                restaurantQuery = restaurantQuery.where('name').equals(req.query.name);
            }
        }
        else if (req.query.name){
                restaurantQuery = restaurantQuery.find({ name:req.query.name});
        }
        else{
            restaurantQuery = restaurantQuery.find({});
        }
        if (req.query.day == 'all'){
            restaurantQuery = restaurantQuery.populate('menus.Monday.menu')
            .populate('menus.Tuesday.menu')
            .populate('menus.Wednesday.menu')
            .populate('menus.Thursday.menu')
            .populate('menus.Friday.menu')
            .populate('menus.Saturday.menu')
            .populate('menus.Sunday.menu');
            console.log('printed all');
        }
        else if (req.query.day){
            restaurantQuery = restaurantQuery.populate('menus.'+ req.query.day +'.menu');
            console.log('printed one day');
        }
        if (restaurantQuery == undefined){
            console.log('result is an undegined empty');
        }
        restaurantQuery.exec(function(error, restaurant) {
            if (error){
                console.log('error is detected');
                console.log(restaurant);
                error.status = 404;
                return next(error);
            }
            else{
                console.log('error in else'+ error);
                console.log('error is not null');
                console.log(restaurant);
                if (restaurant.length && restaurant.length > 0){
                    console.log('printed no query');
                    res.send(JSON.stringify(restaurant, null, "\t"));
                    console.log(JSON.stringify(restaurant, null, "\t"));
                }
                else{
                    console.log(restaurant.length);
                    console.log('result is empty');
                    err = new Error("no restaurant found");
                    err.status = 404;
                    console.log('_-_undefined');
                    next(err);
                }
            }
        });
    });
    app.use(function(err, req, res, next) {
        console.log('err status');
        console.log(err.status);
        console.log('err message');
        console.log(err.message);
        //console.log(req);
        //console.log(err.message);
        //res.status(err.status || 500);
        res.json(err.status, { error: err.message });
    });
}
