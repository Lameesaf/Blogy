//Require necessary NPM packags
const express = require('express');

//Require Mongoose Model for Article
const Article = require('../models/article')



//Instantiate a Router (mini app that only handles routes)
const router = express.Router();


/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/articles
 * Deription:   Get all Articles
 */

router.get('/api/articls', (req, res) => {
  Article.find()
    //Return all Article as an array
    .then((article) => {
      res.status(200).json({ article: article })
    })
    //catch any error that might accur
    .catch((error) => {
      res.status(500).json({ error: error })
    })
})


/**
* Action:      SHOW
* Method:      GET
* URI:         /api/articles/:article_id
* Deription:   Get an Article by Article id
*/

router.get('/api/articles/:article_id', (req, res) => {
  res.json('article BY ID')
})

/**
* Action:      CREATE
* Method:      POST
* URI:         /api/articles/
* Deription:   Create a new Article
*/

router.post('/api/articles/', (req, res) => {
  res.json(req.body)
})

/**
* Action:      UPDATE
* Method:      PATCH
* URI:         /api/articles/:article_id
* Deription:   Update an Article by Article id
*/

router.patch('/api/articles/:article_id', (req, res) => {
  res.json(req.body)
})



/**
* Action:      DESTROY
* Method:      DELETE
* URI:         /api/articles/:article_id
* Deription:   Delete an Article by Article id
*/

router.delete('/api/articles/:article_id', (req, res) => {
  res.json('delete')
})


//Export the router so we can use it in the server.js file
module.exports = router;