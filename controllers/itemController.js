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
        else if (req.query.name){
                itemQuery = itemQuery.find({ name:req.query.name});
        }
        else{
            itemQuery = itemQuery.find({});
        }
        itemQuery.exec(function(error, items) {
            res.send(JSON.stringify(items));
            console.log(JSON.stringify(items, null, "\t"));
        });
    });

    app.post('/api/item', function(req, res){
        if (req.body.id) {
            Item.findByIdAndUpdate(req.body.id, {
                name: req.body.name,
                price:req.body.price,
                imageUrl: req.body.imageUrl
            },function(err, todo){
                if (err) throw err;
                res.send('success');
            });
        }
        else{
            var newTodo = Todos({
                name: req.body.name,
                price:req.body.price,
                imageUrl: req.body.imageUrl
            });
            newTodo.save(function(err){
                if (err) throw err;
                res.send('success');
            });
        }
    });

}
