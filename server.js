//Require necessary NPM packags
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

//Require Route Files
const indexRoute = require('./app/routes/index');
const articlsRoute = require('./app/routes/articles');
const commentsRoute = require('./app/routes/comments');


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
const reactPort = 3000;

/***Middleware***/

//add `BodyParser` middleware which will parse JSON requests into
//JS objects before they reach route files
//
//the method `use` sets up middleware for the Express appliction
app.use(express.json())

// Set CORS header on response from this API using `cors` NPM package
app.use(cors({origin: process.env.CLIENT_ORIGIN || `http://localhost:${reactPort}`}))

/***Routes***/

//Mount imported Routers
app.use(indexRoute)
app.use(articlsRoute)
app.use(commentsRoute)


//start the server to listen for requests on a given port
app.listen(port, ()=>{
  console.log(`blogy is listening on port ${port}`)
});