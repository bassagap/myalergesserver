

// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var mongoose   = require('mongoose');
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.

//(Focus on This Variable)
var url = 'mongodb://bassagap:pepitogrillo@ds141351.mlab.com:41351/myalerges';
//(Focus on This Variable)

var Food     = require('./app/models/food');

// Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);


    //Close connection
    db.close();
  }
});
mongoose.connect('mongodb://bassagap:pepitogrillo@ds141351.mlab.com:41351/myalerges'); // connect to our database


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
router.get('/', function(req, res) {
  var food = new Food();      // create a new instance of the Bear model
  food.name = req.body.name;  // set the bears name (comes from the request)

  // save the bear and check for errors
  food.save(function(err) {
      if (err)
          res.json(err);

      res.json({ message: 'food created!' });
  });
});

router.route('/foods')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var food = new Food();      // create a new instance of the Bear model
        food.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        food.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'food created!' });
        });

    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
