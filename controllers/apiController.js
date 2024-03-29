var Restaurant = require('../models/restaurantModel');
var Menu = require('../models/menuModel');
var Item = require('../models/itemModel');

module.exports = function(app) {
    
    app.get('/api/getItem', function(req, res){    
        itemQuery = Item;
        if (req.query.id){
            itemQuery = itemQuery.find({ _id:req.query.id });
            if (req.query.name){
                itemQuery = itemQuery.where('name').equals(req.query.name);
            }
        }
        else{
            itemQuery = itemQuery.find({ name:req.query.name});
        }
        itemQuery.exec(function(error, items) {
            res.send(JSON.stringify(items));
            console.log(JSON.stringify(items, null, "\t"));
        });
    });
}
