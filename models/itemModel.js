var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemShema = new Schema({
    name: String,
    price: Number,
    imageUrl: String
});

var Item = mongoose.model('Item', itemShema);

module.exports = Item;