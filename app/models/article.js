//Require necessary NPM packags
const mongoose = require('mongoose');

//Define Article Schema
const articleSchema = new mongoose.Schema({
title: {type: String, required:true},
content:  String,
author: {type: String, required: true},
published: {type: Boolean, default:true},
publishedOn: {type:Date, default: Date.now}
},{timestamps: true});

//Compile our model based on schema
const Article = mongoose.model('Articla', articleSchema);

//export model for use
module.exports = Article;