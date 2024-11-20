var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {

  try {
    const db = req.app.locals.db;
    const employees = await db.collection('employees')
      .aggregate([
        {
          $lookup: {
            from: 'departments',
            localField: 'depID',
            foreignField: '_id',
            as: 'department'
          }
        },
        {
          $lookup: {
            from: 'titles',
            localField: 'titleID',
            foreignField: '_id',
            as: 'title'
          }
        }
      ])
      .toArray();
    res.render('index', { title: 'Magic Association Employee Database', employees: employees });
  } catch (error) {
    console.log('error!');
    res.status(500).send('An error occurred');
  }


});

module.exports = router;
