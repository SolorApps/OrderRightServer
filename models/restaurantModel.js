var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// var menuShema = new Schema({
//     Appetizers: {
//         name:String
//     }
// });

var restaurantSchema = new Schema({
    name: String,
    category: { type: String, index: true },
    imageUrl: String,
    latitude: Number,
    longitude: Number,
    menus: {
        Monday: {
            menu: {type:mongoose.Schema.Types.ObjectId,ref: 'Menu'}
        },
        Tuesday: {
            menu: {type:mongoose.Schema.Types.ObjectId,ref: 'Menu'}
        },
        Wednesday: {
            menu: {type:mongoose.Schema.Types.ObjectId,ref: 'Menu'}
        },
        Thursday: {
            menu: {type:mongoose.Schema.Types.ObjectId,ref: 'Menu'}
        },
        Friday: {
            menu: {type:mongoose.Schema.Types.ObjectId,ref: 'Menu'}
        },
        Saturday: {
            menu: {type:mongoose.Schema.Types.ObjectId,ref: 'Menu'}
        },
        Sunday: {
            menu: {type:mongoose.Schema.Types.ObjectId,ref: 'Menu'}
        }
    }
});

var Restaurants = mongoose.model('Restaurants', restaurantSchema);
// var Menu = mongoose.model('Menu', menuShema);

module.exports = Restaurants;
