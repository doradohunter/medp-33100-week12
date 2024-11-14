var express = require('express');
const { ObjectId, Timestamp } = require('mongodb');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  try{
    const db = req.app.locals.db;
    const products = await db.collection('products')
      .find()
      .toArray();
    res.render('index', { products: products });

  }catch (error) {
    console.log(error)
  }
});

module.exports = router;
