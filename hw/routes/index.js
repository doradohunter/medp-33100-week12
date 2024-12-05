var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    const db = req.app.locals.db;
    const albums = await db.collection('albums')
      .find()
      .toArray();
    console.log(albums);

    res.render('index', {title: 'Albums', albums: albums});
  }catch(error){
    console.log(error);
  }
});

module.exports = router;
