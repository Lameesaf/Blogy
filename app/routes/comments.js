//Require necessary NPM packags
const express = require('express');

//Require Mongoose Model for Article
const Article = require('../models/article').Article
const Comment = require('../models/article').Comment



//Instantiate a Router (mini app that only handles routes)
const router = express.Router();


/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/articles
 * Deription:   Get all Articles
 */

router.get('/api/articles/:article_id/comments', (req, res) => {
  Article.find()
    //Return all Article as an array
    .then((article) => {
      res.status(200).json(article)
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

router.get('/api/articles/:article_id/comments/:comments_id', (req, res) => {
  Article.findById(req.params.article_id)
  .then((article) => {
    if (article) {
      //Pass the result of Mongoose's `.get` method to the next `.then`
      res.status(201).json(article.comments.id(req.params.comments_id));
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
  //catch any error that might accur
  .catch((error) => {
    res.status(500).json({ error: error });
  })
})

/**
* Action:      CREATE
* Method:      POST
* URI:         /api/articles/
* Deription:   Create a new Article
*/

router.post('/api/articles/:article_id/comments', (req, res) => {

    Article.findById(req.params.article_id)
  .then((article) => {
    if (article) {
      //Pass the result of Mongoose's `.get` method to the next `.then`
      const newComment = new Comment ({commentText: req.body.commentText})

      article.comments.push(newComment)
      article.save()
      console.log(article)
      res.status(200).json(article)
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
})



/**
* Action:      UPDATE
* Method:      PATCH
* URI:         /api/articles/:article_id
* Deription:   Update an Article by Article id
*/

router.patch('/api/articles/:article_id/comments/:comments_id', (req, res) => {
  Article.findById(req.params.article_id)
    .then((article) => {
      if (article) {
        //Pass the result of Mongoose's `.update` method to the next `.then`
        article.comments.id(req.params.comments_id).commentText = req.body.commentText
        article.save()
        return article
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
    .then((article) => {
      //if the update succeeded, return 204 and no JSON
      res.status(200).send(article);
    })
    //catch any error that might accur
    .catch((error) => {
      res.status(500).json({ error: error });
    })
})



/**
* Action:      DESTROY
* Method:      DELETE
* URI:         /api/articles/:article_id
* Deription:   Delete an Article by Article id
*/

router.delete('/api/articles/:article_id/comments/:comments_id', (req, res) => {
  Article.findById(req.params.article_id)
    .then((article) => {
      if (article) {
        //Pass the result of Mongoose's `.delete` method to the next `.then`
        article.comments.id(req.params.comments_id).remove()
        article.save();
        res.send(article)
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
    //catch any error that might accur
    .catch((error) => {
      res.status(500).json({ error: error });
    })
})


//Export the router so we can use it in the server.js file
module.exports = router;