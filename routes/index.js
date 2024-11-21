var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    try {
    const db = req.app.locals.db;

    const album = await db.collection('album')
      .find()
      .toArray();
    console.log(album);

    res.render('index', {title: 'Chromakopia', album: album})
    // const albums = await db.collection('Chromakopia')
    //   .aggregate ([
    //     {
    //       $lookup: {
    //         from: 'album',
    //         foreignField: '_id',
    //         localField: 'title',
    //         as: 'length'
    //       }
    //     }
    //   ])
    //   .toArray();
    // console.log(albums);
    } catch (error) {
      console.log(error);
    }
  
});

module.exports = router;
