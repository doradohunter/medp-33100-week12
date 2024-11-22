var express = require('express');
const { ObjectId, Timestamp } = require('mongodb');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  
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
    res.render('index', { products: products });

  }catch (error) {
    console.log(error)
  }
});

router.post('/', async function (req, res, next) {
  console.log('MAKING POST REQUEST')
  console.log(req.body)
  // try {
  //     const db = req.app.locals.db;  // Access the shared database instance
  //     const post = req.body;
  //     console.log(post);

  //     const newPost = {
  //         title: post.title,
  //         content: post.content,
  //         authorID: new ObjectId(post.authorID),
  //         createdAt: new Timestamp({ t: Math.floor(Date.now() / 1000), i: 0 }),
  //     };

  //     await db.collection('posts').insertOne(newPost);
  //     res.send('Created new post');
  // } catch (error) {
  //     next(error);
  // }
});

module.exports = router;
