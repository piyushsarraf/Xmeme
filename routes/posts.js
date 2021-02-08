const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//GETS BACK POST 
router.get('/', async(req, res) => {
    try {
        const post = await Post.find().sort({ _id: -1 }).limit(2)
        res.json(post);
    } catch (err) {
        res.json({message: err});
    }
})

//SUBMITS THE POST
router.post('/', async(req, res) => {
    //console.log(req.body);
    const post = new Post({
        name: req.body.name,
        caption: req.body.caption,
        url: req.body.url
    });

    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch (err) {
        res.json({message: err});
    }
});

module.exports = router;