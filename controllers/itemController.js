var Item = require('../models/itemModel');

module.exports = function(app) {
    
    app.get('/api/getItem', function(req, res, next){    
        itemQuery = Item;
        if (req.query.id){
            itemQuery = itemQuery.find({ _id:req.query.id });
            if (req.query.name){
                itemQuery = itemQuery.where('name').equals(req.query.name);
            }
        }
        else if (req.query.name){
                itemQuery = itemQuery.find({ name:req.query.name});
        }
        else{
            itemQuery = itemQuery.find({});
        }
        itemQuery.exec(function(error, items) {
            if (error){
                error.status = 404;
                return next(error);
            }
            else{
                if (items.length && items.length > 0){
                    res.status(200).json(items);
                    console.log(JSON.stringify(restaurant, null, "\t"));
                }
                else{
                    err = new Error("no items found");
                    err.status = 404;
                    next(err);
                }
            }
        });
    });

    app.post('/api/createItem', function(req, res, next){
        if (req.body.id) {
            Item.findByIdAndUpdate(req.body.id, {
                name: req.body.name,
                price:req.body.price,
                imageUrl: req.body.imageUrl
            },function(err, item){
                if (err){
                    error.status = 404;
                    return next(err);
                }
                else{
                    res.status(200).json({ result: 'success'});
                }
            });
        }
        else{
            var newTodo = Item({
                name: req.body.name,
                price:req.body.price,
                imageUrl: req.body.imageUrl
            });
            newTodo.save(function(err){
                if (err){
                    error.status = 404;
                    return next(err);
                }
                else{
                    res.status(200).json({ result: 'success'});
                }
            });
        }
    });

}
