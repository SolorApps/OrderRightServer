var Menu = require('../models/menuModel');

module.exports = function(app) {
    
    app.get('/api/getMenu', function(req, res){    
        menuQuery = Menu;
        if (req.query.id){
            menuQuery = menuQuery.find({ _id:req.query.id });
        }
        else{
            menuQuery = Menu.find({});
        }
        menuQuery.populate('Appetizers.items')
            .populate('MainDishes.items')
            .populate('Desserts.items')
            .populate('Drinks.items')
            .exec(function(error, menus) {
                res.send(JSON.stringify(menus, null, "\t"));
                console.log(JSON.stringify(menus, null, "\t"));
            });
    });
}
