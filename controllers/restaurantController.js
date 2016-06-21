var Restaurant = require('../models/restaurantModel');

module.exports = function(app) {
    
    app.get('/api/getRestaurant', function(req, res){    
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
        restaurantQuery.exec(function(error, restaurant) {
                res.send(JSON.stringify(restaurant, null, "\t"));
                console.log(JSON.stringify(restaurant, null, "\t"));
            });
    });
}
