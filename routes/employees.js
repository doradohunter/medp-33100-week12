var express = require('express');
var router = express.Router();
const {ObjectId} = require('mongodb')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/', async function(req, res){
    console.log(req.body)
    try {
        const db = req.app.locals.db;
        const newEmployee = {
            name: req.body.name,
            email: req.body.email,
            depID: new ObjectId(req.body.depID),
            titleID: new ObjectId(req.body.titleID)
        }
        employees = await db.collection('employees')
            .insertOne(newEmployee)
            res.send('we got it!')
    } catch (error) {
        console.log('uh oh :(')
    }
    
})

module.exports = router;