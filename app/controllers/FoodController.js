var mongoose = require('mongoose'),
    Food     = require('./app/models/food');
var mongodb = require('mongodb');
var axios      = require('axios');
exports.getFood = function(req, res) {
  var barcode = req.params.barcode;
  var food_information;
  var food = new Food();      // create a new instance of the Bear model
  console.log("barcode: ", req.params.barcode);
  axios.get("https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json")
   .then(function (response) {
     food.name = response.data.product.product_name;
     food.ingredients = response.data.product.ingredients;
     food.save(function(err) {

     });
   res.json(response.data);
   })
   .catch(function (error) {
     res.send(error);
   });
   console.log(food);
};
