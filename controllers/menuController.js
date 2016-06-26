var Menu = require('../models/menuModel');
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
            var section = req.body.section;
            Menu.findByIdAndUpdate(req.body.id, {
                '$push': {
                    "Appetizers.Items":{$oid:req.body.itemId}
                }
            },function(err, menu){
                console.log(menu);
                if (err){
                    err.status = 409;
                    return next(err);
                }
                else{
                    res.status(200).json({ result: 'success'});
                }
            });
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
