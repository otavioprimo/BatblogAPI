var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
mongoose.connect('mongodb://localhost:27017/blog001');

var posts = require('./routes/posts.js');
var users = require('./routes/user.js');

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/post', posts);
app.use('/api/user', users);


var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening port ' + port); 