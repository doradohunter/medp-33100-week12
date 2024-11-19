var express = require('express');
const connectToDatabase = require('../config/db'); 
var router = express.Router();

/* GET home page. */
const { ObjectId } = require('mongodb');

router.get('/', async function(req, res, next) {
  console.log("before try");
  try {
    const db = await connectToDatabase();
    const animalsWithHabitats = await db.collection('animals').aggregate([
      {
        $lookup: {
          from: 'habitats', 
          let: { animalId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$$animalId', '$animalIds'] 
                }
              }
            }
          ],
          as: 'habitatDetails'
        }
      }
    ]).toArray();

    res.render('index', { animals: animalsWithHabitats });
  } catch (error) {
    console.error("Error fetching animals with habitats:", error);
    res.render('index', { animals: [] });
  }
});



module.exports = router;