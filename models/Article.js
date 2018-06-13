var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
    title: String,
    content: String
  });

module.exports = mongoose.model('Article', ArticleSchema);