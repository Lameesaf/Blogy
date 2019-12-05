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

router.get('/api/articles', (req, res) => {
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

router.post('/api/articles', (req, res) => {
  Article.create(req.body.article)
    //on a successful `create` action, respond with 201
    //HTTP status and the content of the new article
    .then((newArticle) => {
      res.status(201).json({ article: newArticle });
    })
    //catch any error that might accur
    .catch((error) => {
      res.status(500).json({ error: error });
    })
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
  Article.findById(req.params.article_id)
    .then((article) => {
      if (article) {
        //Pass the result of Mongoose's `.delete` method to the next `.then`
        return article.remove()
      } else {
        //if we couldn't find a document with matching ID
        res.status(404).json({
          error: {
            name: 'Document not found error',
            message: 'The provided ID doesn\'t match any document'
          }
        })
      }
    })
    .then(() => {
      //if the deletion succeeded, return 204 and no JSON
      res.status(204).end();
    })
    //catch any error that might accur
    .catch((error) => {
      res.status(500).json({ error: error });
    })
})


//Export the router so we can use it in the server.js file
module.exports = router;