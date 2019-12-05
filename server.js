//Require necessary NPM packags
const express = require('express');
const mongoose = require('mongoose');

//Require Route Files
const indexRoute = require('./app/routes/index');


// Instantive Express Appliction Object
const app = express();

//Define PORT for the API to run on
const port = process.env.PORT || 5000;


/***Routes***/

//Mount imported Routers
app.use(indexRoute)

//start the server to listen for requests on a given port
app.listen(port, ()=>{
  console.log(`blogy is listening on port ${port}`)
});