var Restaurant = require('../models/restaurantModel');
var Menu = require('../models/menuModel');

module.exports = function(app) {
    
    app.get('/api/setupTodos', function(req, res){
        //seed database has to have same shema
        // var starterRestaurant = [
        //     {
        //         name: 'macdonald',
        //         imageUrl: "http://www.roastedmontreal.com/wp-content/uploads/2014/10/Restaurant-Sumac-Front.jpg",
        //         latitude: 3.2,
        //         longitude: 1.4,
        //         menus: {
        //             Monday: {
        //                 menu: {type:mongoose.Schema.Types.ObjectId,ref: 'menuSchema'}
        //             }
        //         }
        //     },
        //     {
        //         name: 'burgerking',
        //         imageUrl: "http://www.eonline.com/eol_images/Entire_Site/201541/rs_1024x759-150501065510-1024.Breaking-Bad-J1R-50115.jpg",
        //         latitude: 5.6,
        //         longitude: 2.4,
        //         menus: {
        //             Monday: {
        //                 menu: {type:mongoose.Schema.Types.ObjectId,ref: 'menuSchema'}
        //             }
        //         }
        //     }
        // ];

        // var newRestaurant = Restaurant({
        //     name: 'macdonald',
        //     imageUrl: "http://www.roastedmontreal.com/wp-content/uploads/2014/10/Restaurant-Sumac-Front.jpg",
        //     latitude: 3.2,
        //     longitude: 1.4
        // });
        // newRestaurant.save(function(err) {
        //     if (err) throw err;
        //     var newMenu = Menu({
        //         Appetizers: {
        //             name:"big mac"
        //         }
        //     });
        //     newMenu.save(function(err) {
        //         if (err) throw err;
        //     });
        //     res.send('success');
        // });

        var newMenu = Menu({
            Appetizers: {
                name:"big mac"
            }
        });
        newMenu.save(function(err) {
            if (err) throw err;
        });
        var newRestaurant = Restaurant({
            name: 'macdonald',
            imageUrl: "http://www.roastedmontreal.com/wp-content/uploads/2014/10/Restaurant-Sumac-Front.jpg",
            latitude: 3.2,
            longitude: 1.4,
            menus: {
                Monday: {
                    menu: newMenu._id
                }
            }
        });
        newRestaurant.save(function(err) {
            if (err) throw err;
            res.send('success');
        });

        // Restaurant.create(newRestaurant, function (err, results) {
        //     res.send(results);
        // });
    });

    app.get('/api/restaurants', function(req, res){
        Restaurant.find({})
            .populate('menus.Monday.menu')
            .exec(function(error, restaurants) {
                console.log(JSON.stringify(restaurants, null, "\t"))
            })
    });

    app.get('/api/setupRestaurants', function(req, res){
        var starterMenu = [
            {
                Appetizers: {
                    name:"big mac"
                }
            },
            {
                Appetizers: {
                    name:"whopper"
                }
            }
        ]
        Menu.create(starterMenu, function(err, menus){
            console.log(menus[0]);
            var starterRestaurant = [
                {
                    name: 'macdonald',
                    imageUrl: "http://www.roastedmontreal.com/wp-content/uploads/2014/10/Restaurant-Sumac-Front.jpg",
                    latitude: 3.2,
                    longitude: 1.4,
                    menus: {
                        Monday: {
                            menu: menus[0]._id
                        }
                    }
                },
                {
                    name: 'burgerking',
                    imageUrl: "http://www.roastedmontreal.com/wp-content/uploads/2014/10/Restaurant-Sumac-Front.jpg",
                    latitude: 5.9,
                    longitude: 4.3,
                    menus: {
                        Monday: {
                            menu: menus[1]._id
                        }
                    }
                }
            ]
            Restaurant.create(starterRestaurant, function (err, restaurants) {
                console.log(restaurants);
                res.send('success');
            });
        });
    });
}

// var starterRestaurant = [
//             {
//                 name: 'macdonald',
//                 imageUrl: "http://www.roastedmontreal.com/wp-content/uploads/2014/10/Restaurant-Sumac-Front.jpg",
//                 latitude: 3.2,
//                 longitude: 1.4,
//                 menus: {
//                     Monday: {
//                         menu: {type:mongoose.Schema.Types.ObjectId,ref: 'menuSchema'}
//                     }
//                 }
//             },
//             {
//                 name: 'burgerking',
//                 imageUrl: "http://www.eonline.com/eol_images/Entire_Site/201541/rs_1024x759-150501065510-1024.Breaking-Bad-J1R-50115.jpg",
//                 latitude: 5.6,
//                 longitude: 2.4,
//                 menus: {
//                     Monday: {
//                         menu: {type:mongoose.Schema.Types.ObjectId,ref: 'menuSchema'}
//                     }
//                 }
//             }
//         ];