//Require necessary NPM packags
const express = require('express');
const mongoose = require('mongoose');

//Require Route Files
const indexRoute = require('./app/routes/index');
const articlsRoute = require('./app/routes/articles');


//Require SB configration File
const db = require('./config/db')

//Establish Database Connection
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open',()=>{
  console.log('Connected to Mongo')
})

// Instantive Express Appliction Object
const app = express();

//Define PORT for the API to run on
const port = process.env.PORT || 5000;


/***Routes***/

//Mount imported Routers
app.use(indexRoute)
app.use(articlsRoute)


//start the server to listen for requests on a given port
app.listen(port, ()=>{
  console.log(`blogy is listening on port ${port}`)
});