//Require necessary NPM packags
const express = require('express');
const mongoose = require('mongoose');


//Instantiate a Router (mini app that only handles routes)
const router = express.Router();


/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /
 * Deription:   Get the Root Route
 */
router.get('/', (req,res)=>{
  res.json({message: 'Welcome to Blogy'})
})

//Export the router so we can use it in the server.js file
module.exports = router;