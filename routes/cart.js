var express = require('express');
const { ObjectId, Timestamp } = require('mongodb');
var router = express.Router();

//POST items into cart
router.post('/', async function (req, res, next) {
    try {
        const db = req.app.locals.db;
        const bag = req.body;
  
        const newItem = {
          productID: new ObjectId(bag.productID)
        };
  
        await db.collection('cart').insertOne(newItem);
        res.send('Created new post');
    } catch (error) {
        next(error);
    }
});

//DELETE items from cart
router.delete('/:id', async function (req, res) {
    try {
        const db = req.app.locals.db;

        await db.collection('cart')
            .deleteOne({productID: new ObjectId(req.params.id)});
        res.send('Successfully deleted');
    } catch (error) {
        next(error);
    }
})
  
//PUT updated stock into database
router.put('/', async function(req,res,next){
    try{
        const db = req.app.locals.db;
        const purchasedItems = req.body;
        
        let purchasedItemsArray = []
        purchasedItems.forEach(item => {
            purchasedItemsArray.push({_id: new ObjectId(item)})
        })
        await db.collection('products')
            .updateMany({$or: purchasedItemsArray}, { $inc: { stock: -1 }})
            
        await db.collection('products')
            .updateMany({stock: 0}, { $set: {category: new ObjectId('673f769e2aebee1897df5bbf')}})

        res.send('Successfully updated');

    } catch (error) {
        next(error);
    }
})

//DELETE all items
router.delete('/', async function (req, res) {
    try {
        const db = req.app.locals.db;

        await db.collection('cart')
            .deleteMany({});
        res.send('Successfully deleted');
    } catch (error) {
        next(error);
    }
})

module.exports = router;
  