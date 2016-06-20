var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var menuShema = new Schema({
    Appetizers: {
        name:String
    }
});

var Menu = mongoose.model('Menu', menuShema);

module.exports = Menu;
