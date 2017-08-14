'use strict';

var mongoose = require('mongoose'),
  Food = mongoose.model('Food');
  var mongodb = require('mongodb');
  var axios      = require('axios');
exports.get_all_ingredients = function(req, res) {
  var barcode = req.query.barcode;
  var food = new Food();
  axios.get("https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json")
   .then(function (response) {
     food.name = response.data.product.product_name;
     var countries = [ "es","en","de","fr","hu","it","pt","sr"];
     if(food.name === ""){
       for(country in countries){
         food.name = response.data.product.product_name_+country;
         if(food.name !== ""){
           break;
         }
       }
     }
     food.ingredients = response.data.product.ingredients;
     food.save(function(err) {
     });
   res.json(food);
   })
   .catch(function (error) {
     res.send(error);
   });
   console.log(food);
};
