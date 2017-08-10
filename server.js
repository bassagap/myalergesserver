
var express = require('express'),
  app = express(),
  port = process.env.PORT || 5000,
  mongoose = require('mongoose'),
  Food = require('./api/models/foodModel'),
  bodyParser = require('body-parser');

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


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/foodRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Magic happens on port: ' + port);
