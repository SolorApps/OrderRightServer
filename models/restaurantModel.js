var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// var menuShema = new Schema({
//     Appetizers: {
//         name:String
//     }
// });

var restaurantSchema = new Schema({
    name: String,
    imageUrl: String,
    latitude: Number,
    longitude: Number,
    menus: {
        Monday: {
            menu: {type:mongoose.Schema.Types.ObjectId,ref: 'Menu'}
        }
    }
});

var Restaurants = mongoose.model('Restaurants', restaurantSchema);
// var Menu = mongoose.model('Menu', menuShema);

module.exports = Restaurants;
