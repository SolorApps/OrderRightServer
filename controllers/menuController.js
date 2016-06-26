var Menu = require('../models/menuModel');
var Item = require('../models/itemModel');
var bodyParser = require('body-parser');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/getMenu', function(req, res){    
        menuQuery = Menu;
        if (req.query.id){
            menuQuery = menuQuery.findOne({ _id:req.query.id });
        }
        else{
            menuQuery = menuQuery.find({});
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
    

    app.post('/api/createMenu', function(req, res, next){
        console.log('start of code');
        menuQuery = Menu;
        console.log(req.body);
        if (req.body.id) {
            console.log('id is here');
            itemQuery = Item;
            itemQuery = itemQuery.findOne({ _id:req.body.itemId });
            itemQuery.exec(function(error, foundItem) {
                if (error){
                    error.status = 404;
                    return next(error);
                }
                else{
                    if (foundItem){
                        console.log(JSON.stringify(foundItem, null, "\t"));
                        var section = req.body.section + 'items';
                        var push = {};
                        push[section] = foundItem;
                        Menu.findByIdAndUpdate(req.body.id, {
                            Appetizers:{
                                $push:{
                                    foundItem
                                }
                            }
                        },{safe: true, upsert: true, new : true},function(err, menu){
                            console.log(menu);
                            if (err){
                                err.status = 409;
                                return next(err);
                            }
                            else{
                                res.status(200).json({ result: 'success'});
                            }
                        });
                    }
                    else{
                        err = new Error("no items found");
                        err.status = 404;
                        next(err);
                    }
                }
            });

            // $push: {
            //     'Appetizers.items':foundItem
            // }

            // if(req.body.removeItem){
            //     Menu.find
            // }
        }
        // if (req.body.removeItem){
        //     menuQuery.findOne({ _id:req.query.id });
        //     menu
        // }

        // else{
            
        // }
        console.log('end of code');
    });
}
