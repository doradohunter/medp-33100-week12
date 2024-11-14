var express = require('express');
const {ObjectId, Timestamp} = require("mongodb");
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

// POST a new post
router.post('/', async function (req, res, next) {
    try {
        const db = req.app.locals.db;  // Access the shared database instance
        const post = req.body;
        console.log(post);

        const newPost = {
            title: post.title,
            content: post.content,
            authorID: new ObjectId(post.authorID),
            createdAt: new Timestamp({ t: Math.floor(Date.now() / 1000), i: 0 }),
        };

        await db.collection('posts').insertOne(newPost);
        res.send('Created new post');
    } catch (error) {
        next(error);
    }
});

module.exports = router;
