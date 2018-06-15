var express = require('express');
var bodyParser = require('body-parser');

var Article = require('./models/Article.js');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/BlogB04901036', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

app.listen(3125);

app.get('/articles', function(req, res, next) {
  Article.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

app.get('/articles/:id', function(req, res, next) {
  Article.findById(req.params.id, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
})

app.post('/articles', function(req, res, next) {
  Article.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

app.put('/articles/:id', function(req, res, next) {
  Article.findByIdAndUpdate(req.params.id, req.body, function (err, put) {
    if (err) return next(err);
    res.json(put);
  });
});

app.delete('/articles/:id', function(req, res, next) {
  Article.findByIdAndRemove(req.params.id, req.body, function (err, del) {
    if (err) return next(err);
    res.json(del);
  });
});
