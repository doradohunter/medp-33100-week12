var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const db = req.app.locals.db;
    const posts = await db.collection('posts').find({}).toArray();
    console.log(posts)
    res.render('index', { title: 'Posts', posts });
  } catch (error) {
    next(error);
  }
});


module.exports = router;

