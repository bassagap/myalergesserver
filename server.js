
var express = require('express'),
  app = express(),
  port = process.env.PORT || 5000,
  mongoose     = require('mongoose'),
  morgan       = require('morgan'),
  Food         = require('./api/models/foodModel'),
  bodyParser   = require('body-parser');
var passport   = require('passport');
// var config     = require('./config/database'); // get db config file
var User       = require('./api/models/userModel'); // get the mongoose model
var jwt        = require('jwt-simple');

mongoose.Promise = global.Promise;
var options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

// Connection URL. This is where your mongodb server is running.

//(Focus on This Variable)
var url = 'mongodb://admin:admin@ds141351.mlab.com:41351/myalerges';
//(Focus on This Variable)

mongoose.connect(url, options);
// pass passport for configuration
require('./api/persistence/passport')(passport);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// log to console
app.use(morgan('dev'));
// Use the passport package in our application
app.use(passport.initialize());

var foodRoutes = require('./api/routes/foodRoutes');
foodRoutes(app);
var userRoutes = require('./api/routes/userRoutes');
userRoutes(app);


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Magic happens on port: ' + port);
