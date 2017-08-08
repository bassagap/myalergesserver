

// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var axios      = require('axios');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;        // set our port
var mongoose   = require('mongoose');
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

var options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

// Connection URL. This is where your mongodb server is running.

//(Focus on This Variable)
var url = 'mongodb://admin:admin@ds141351.mlab.com:41351/myalerges';
//(Focus on This Variable)

mongoose.connect(url, options);
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function () {console.log("Great success!")});

var Food     = require('./app/models/food');


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
      res.json({ message: 'food created!' });
});

router.route('/foods')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var food = new Food();      // create a new instance of the Bear model
        food.name = "naaaame"; //req.body.name;  // set the bears name (comes from the request)
        console.log(food);
        // save the bear and check for errors
        food.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'food created!222' });
        });

    })
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
      var barcode = req.query.barcode;
      axios.get("https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json")
       .then(function (response) {
       res.json(response.data);
       })
       .catch(function (error) {
         res.send(error);
       });
     });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
