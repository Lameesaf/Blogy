//Require necessary NPM packags
const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  commentText: String
});


//Define Article Schema
const articleSchema = new mongoose.Schema({
title: {type: String, required:true},
content:  String,
author: {type: String, required: true},
published: {type: Boolean, default:true},
publishedOn: {type:Date, default: Date.now},
comments: [commentSchema]
},{timestamps: true});

//Compile our model based on schema
const Article = mongoose.model('Articla', articleSchema);
const Comment = mongoose.model('Comment', commentSchema);

//export model for use
module.exports ={ Article, Comment};