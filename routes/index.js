var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  if(req.app.locals.db){
    try{
      const db = req.app.locals.db;
      const books = await db.collection('Books')
        .aggregate([
          {
            $lookup: {
              from: 'Members',
              localField: '_id',
              foreignField:'borrowedBooks',
              as: 'borrowers'
            }
          }
        ])
        .toArray();
        res.render('index', { title: 'Library', books: books});
    } catch(error){
      console.log(error);
    }
  }
});

module.exports = router;
