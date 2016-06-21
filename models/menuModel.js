var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var menuShema = new Schema({
    Appetizers: {
        items: [{type:mongoose.Schema.Types.ObjectId,ref: 'Item'}]
    },
    MainDishes: {
        items: [{type:mongoose.Schema.Types.ObjectId,ref: 'Item'}]
    },
    Desserts: {
        items: [{type:mongoose.Schema.Types.ObjectId,ref: 'Item'}]
    },
    Drinks: {
        items: [{type:mongoose.Schema.Types.ObjectId,ref: 'Item'}]
    }
});

var Menu = mongoose.model('Menu', menuShema);

module.exports = Menu;
