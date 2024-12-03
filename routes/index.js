var express = require('express');
const connectToDatabase = require('../config/db');
var router = express.Router();
const { ObjectId } = require('mongodb');

/* GET home page. */
router.get('/', async function(req, res, next) {
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

/* POST */
router.post('/', async function(req, res) {
  const { name, habitatName, funFact } = req.body;

  const newAnimal = {
    name,
    funFact
  };

  try {
    const db = await connectToDatabase();
    const result = await db.collection('animals').insertOne(newAnimal);

    if (habitatName) {
      try {
        const habitat = habitatName.toString(); 
        const existingHabitat = await db.collection('habitats').findOne({ habitatName: habitat });
    
        if (existingHabitat) {
          await db.collection('habitats').updateOne(
            { habitatName: habitat },
            { $addToSet: { animalIds: result.insertedId } }
          );
        } 
        else {
          await db.collection('habitats').insertOne({
            habitatName: habitat,
            animalIds: [result.insertedId],
          });
        }
      } catch (error) {
        console.error('Error inserting animal:', error);
      }
    } else {
      console.warn('No valid habitatName provided');
    }    

    res.redirect('/');
  } catch (error) {
    console.error("Error inserting animal:", error);
    res.status(500).send("Error adding animal to the database");
  }
});

/* PUT */
router.put('/animals/:id', async (req, res) => {
  const animalId = req.params.id;
  const { name: new_name, habitatName: new_habitatName, funFact: new_funFact } = req.body;

  try {
    const db = await connectToDatabase();

    const animalUpdateResult = await db.collection('animals').updateOne(
      { _id: new ObjectId(animalId) },
      { $set: { name: new_name, funFact: new_funFact } }
    );

    if (!animalUpdateResult.matchedCount) {
      return res.status(404).send('Animal not found');
    }

    const oldHabitat = await db.collection('habitats').findOne({
      animalIds: new ObjectId(animalId),
    });

    const old_habitatName = oldHabitat?.habitatName;

    if (old_habitatName) {
      await db.collection('habitats').updateOne(
        { habitatName: old_habitatName },
        { $pull: { animalIds: new ObjectId(animalId) } }
      );

      const updatedOldHabitat = await db.collection('habitats').findOne({ habitatName: old_habitatName });
      if (updatedOldHabitat && (!updatedOldHabitat.animalIds || updatedOldHabitat.animalIds.length === 0)) {
        await db.collection('habitats').deleteOne({ habitatName: old_habitatName });
      }
    }

    await db.collection('habitats').updateMany(
      { animalIds: new ObjectId(animalId) },
      { $pull: { animalIds: new ObjectId(animalId) } }
    );

    if (new_habitatName) {
      const habitat = new_habitatName.toString().trim();
      const existingHabitat = await db.collection('habitats').findOne({ habitatName: habitat });

      if (existingHabitat) {
        await db.collection('habitats').updateOne(
          { habitatName: habitat },
          { $addToSet: { animalIds: new ObjectId(animalId) } }
        );
      } else {
        await db.collection('habitats').insertOne({
          habitatName: habitat,
          animalIds: [new ObjectId(animalId)],
        });
      }
    }

    res.send('Animal updated successfully');
  } catch (error) {
    res.status(500).send('Error updating animal in the database');
  }
});


/* DELETE */
router.delete('/delete/:id', async function(req, res) {
  const { id } = req.params;
  try {
    const db = await connectToDatabase();

    const result = await db.collection('animals').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      await db.collection('habitats').updateMany(
        { animalIds: new ObjectId(id) }, 
        { $pull: { animalIds: new ObjectId(id) } }
      );

      const emptyHabitats = await db.collection('habitats').find({ animalIds: { $size: 0 } }).toArray();
      if (emptyHabitats.length > 0) {
        const habitatIds = emptyHabitats.map(habitat => habitat._id);
        await db.collection('habitats').deleteMany({ _id: { $in: habitatIds } });
      }

      res.status(200).send('Animal and its associations deleted');
    } else {
      res.status(404).send('Animal not found');
    }
  } catch (error) {
    console.error('Error deleting animal:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
