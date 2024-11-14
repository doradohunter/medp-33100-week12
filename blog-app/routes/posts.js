var express = require('express');
const {ObjectId} = require("mongodb");
var router = express.Router();

// GET all posts
router.get('/', async function (req, res, next) {
    try {
        const db = req.app.locals.db;  // Access the shared database instance
        const posts = await db.collection('posts').aggregate([{
            $lookup: {
                from: 'users',                // The collection to join
                localField: 'authorID',       // Field from `posts`
                foreignField: '_id',          // Field from `users`
                as: 'authors'              // Output array containing matched users
            }
        }]).toArray();
        res.json(posts);
    } catch (error) {
        next(error);
    }
});
