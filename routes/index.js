var express = require('express');
var router = express.Router();


router.get('/', async function (req, res, next) {
  try {
    const db = req.app.locals.db;
    const posts = await db.collection('posts')
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'authorID',
            foreignField: '_id',
            as: 'authors'
          }
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'postID',
            as: 'comments'
          }
        },
      ])
      .sort({ createdAt: -1 })
      .toArray();
    console.log(posts)
    res.render('index', { title: 'Posts', posts });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  }
});


module.exports = router;
