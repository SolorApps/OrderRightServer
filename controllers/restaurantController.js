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
        if (!restaurantQuery){
            console.log('printed no query');
        }
        if (restaurantQuery == undefined){
            console.log('result is empty');
        }
        restaurantQuery.exec(function(error, restaurant) {
            console.log('PRINTING' + error);

            if (error){
                console.log('error is detected');
                error.status = 404;
                return next(error);
            }
            else{
                console.log('error is not null');
                // res.send(restaurant);
                res.send(JSON.stringify(restaurant, null, "\t"));
                console.log(JSON.stringify(restaurant, null, "\t"));
            }


            // if (error == null){
            //     console.log('this is null');
            // }
            // else{
            //     console.log('this is not null');
            //     console.log(error);
            //     console.log('not null and status');
            //     console.log(error.status);
                
            // }
            //if (error) return next(error);

                // if (restaurant == undefined){
                //     err = new Error("this was err undefined");
                //     err.status = 404;
                //     //console.log(err.status);
                //     console.log('_-_undefined');
                //     next(err);
                //     //res.json(500, { error: 'message' });
                // }
                // else if (restaurant.length && restaurant.length > 0){
                //     console.log('printed no query');
                // }
                // else{
                //     console.log(restaurant.length);
                //     console.log(error);
                //     console.log('result is empty');
                // }
                //res.send(restaurant);
                //res.json(500, { error: 'message' });
                //res.send(JSON.stringify(restaurant, null, "\t"));
                //console.log(JSON.stringify(restaurant, null, "\t"));
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
