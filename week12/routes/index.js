var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const db = req.app.locals.db;
    const knights = await db.collection('knights')
      .find()
      .toArray();
    
    res.render('index', { title: 'Ensemble Stars', knights: knights});
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
