var Restaurant = require('../models/restaurantModel');
var Menu = require('../models/menuModel');
var Item = require('../models/itemModel');

module.exports = function(app) {

    app.get('/api/setupDatabase', function(req, res){
        var starterItem = [
            {
                name: 'Anticucho',
                price: 3,
                imageUrl: 'https://www.wong.com.pe/comesano/images/imgRecetasLarge/Anticuchos.jpg'
            },
            {
                name: 'Enpanada',
                price: 2,
                imageUrl: 'http://www.empanada-lady.com/wp-content/uploads/2014/08/empanada.png'
            },
            {
                name: 'Rotisserie Chicken',
                price: 5,
                imageUrl: 'http://img.enkivillage.com/s/upload/images/5dc202c7fa319ff911ca36d93981171b.jpg'
            },
            {
                name: 'Lomo Saltado',
                price: 6,
                imageUrl: 'http://dinnerthendessert.com/wp-content/uploads/2015/05/Lomo-Saltado-Side.jpg'
            },
            {
                name: 'Flan',
                price: 2,
                imageUrl: 'http://tusharexpress.com/wp-content/uploads/2013/10/Flan.jpg'
            },
            {
                name: 'Inca Cola',
                price: 1.3,
                imageUrl: 'http://www.vivaperu.co.uk/wp-content/uploads/2014/01/incakola_can.jpg'
            },
            {
                name: 'Coca Cola',
                price: 1,
                imageUrl: 'http://www.marijuanapackaging.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/o/coca-cola-stash-can-12-oz-1_1.jpg'
            }
        ]
        Item.create(starterItem, function(errItem, itemsCreated){
            if (errItem) throw errItem;
            var starterMenu = [
                {
                    Appetizers: {
                        items: [itemsCreated[0],itemsCreated[1]]
                    },
                    MainDishes: {
                        items: [itemsCreated[2],itemsCreated[3]]
                    },
                    Desserts: {
                        items: [itemsCreated[4]]
                    },
                    Drinks: {
                        items: [itemsCreated[5],itemsCreated[6]]
                    }
                }
            ]
            Menu.create(starterMenu, function(errMenu, menus){
                if (errMenu) throw errMenu;
                var starterRestaurant = [
                    {
                        name: 'Mi Lindo Peru',
                        imageUrl: 'http://www.latinlife.com/media/tinymce-images/mi-lindo-peru-san-francisco.jpg',
                        latitude: 40.679716,
                        longitude: -73.614408,
                        menus: {
                            Monday: {
                                menu: menus[0]._id
                            }
                        }
                    },
                    {
                        name: 'Mario\'s Peruvian Restaurant',
                        imageUrl: 'https://alphabetcitystudio.files.wordpress.com/2011/08/p1030822.jpg',
                        latitude: 40.658000,
                        longitude: -73.608351,
                        menus: {
                            Monday: {
                                menu: menus[0]._id
                            }
                        }
                    }
                ]
                Restaurant.create(starterRestaurant, function (errRestaurant, restaurants) {
                    if (errRestaurant) throw errRestaurant;
                    console.log(restaurants);
                    res.send('success');
                });
            });
        });
    });
}