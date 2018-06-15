var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String
  });

module.exports = mongoose.model('ArticleB04901036', ArticleSchema);