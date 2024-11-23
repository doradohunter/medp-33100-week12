var express = require('express');
const { ObjectId, Timestamp } = require('mongodb');
var router = express.Router();

/* GET shop*/
router.get('/', async function(req, res, next) {
  //GET candles
  try{
    const db = req.app.locals.db;
    const products = await db.collection('products')
      .aggregate([
        {
          $lookup: {
            from: 'categories'
            ,foreignField: '_id'
            ,localField: 'category'
            ,as: 'label'
          }
        }
      ])
      .toArray()

  //GET cart items
      const cartItems = await db.collection('cart')
        .aggregate([
          {
            $lookup: {
              from: 'products'
              ,foreignField: '_id'
              ,localField: 'productID'
              ,as: 'product'
            }
          }
        ])
        .toArray()

    res.render('index', { products: products, cartItems: cartItems });

  }catch (error) {
    console.log(error)
  }
});

module.exports = router;
