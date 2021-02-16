const express = require('express');
const { mongo, models } = require('mongoose');
const router = express.Router();
const Post = require('../models/Post');

//GETS BACK POST 
/**
 * @swagger
 * /memes:
 *  get:
 *    description: Use to request all memes
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', async(req, res) => {
    try {
        const post = await Post.find().sort({ _id: -1 }).limit(100)
        res.json(post);
    } catch (err) {
        res.json({message: err});
    }
})

/**
 * @swagger
 * /memes/id:
 *  get:
 *    description: Returns a single meme
 *    summary: "Find memes by ID"
 *    parameters: 
 *    - name: "MemeId"
 *      in: "path"
 *      required: true
 *      type: "string"
 *      format: "string"
 *      server: http://localhost:5000/memes
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Meme not found
 * 
 */

 //Get by Id 
router.get('/:id', async (req, res) => {
    var id = req.params.id
    try {
        const result = await Post.findById(id).exec();
        res.json(result);
    } catch(err) {
        res.sendStatus(404);
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
        //res.redirect(process.env.URL)
    }catch (err) {
        res.json({message: err});
    }
});


module.exports = router;