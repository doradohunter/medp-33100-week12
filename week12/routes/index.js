var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const db = req.app.locals.db;
    const knights = await db.collection('knights').find().toArray();
    const events = await db.collection('events').find().toArray();

    res.render('index', { title: 'Ensemble Stars', knights: knights, events: events });
  } catch (error) {
    console.log(error);
  }
});

router.post('/events', async function (req, res, next) {
  try {
    const db = req.app.locals.db;
    const { eventname, eventscorerank, eventpointrank } = req.body;
    await db.collection('events').insertOne({
      eventname: eventname,
      eventscorerank: eventscorerank,
      eventpointrank: eventpointrank
    });

    res.redirect('/');
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put('/events/:id', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const { ObjectId } = require('mongodb');

    const { eventname, eventscorerank, eventpointrank } = req.body;
    const eventId = req.params.id;  

   
    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(eventId) },  // Use 'new' to instantiate ObjectId
      {
        $set: {
          eventname: eventname,
          eventscorerank: eventscorerank,
          eventpointrank: eventpointrank
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete('/events/:id', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const { ObjectId } = require('mongodb');
    const eventId = req.params.id;

    const result = await db.collection('events').deleteOne({ _id: new ObjectId(eventId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
});


module.exports = router;
