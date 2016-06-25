var Restaurant = require('../models/restaurantModel');

module.exports = function(app) {    
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
        }
        else if (req.query.day){
            restaurantQuery = restaurantQuery.populate('menus.'+ req.query.day +'.menu');
        }
        restaurantQuery.exec(function(error, restaurant) {
            if (error){
                error.status = 404;
                return next(error);
            }
            else{
                if (restaurant.length && restaurant.length > 0){
                    res.status(200).json(restaurant);
                    //res.send(JSON.stringify(restaurant, null, "\t"));
                    console.log(JSON.stringify(restaurant, null, "\t"));
                }
                else{
                    err = new Error("no restaurant found");
                    err.status = 404;
                    next(err);
                }
            }
        });
    });
}
