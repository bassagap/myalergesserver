// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FoodSchema   = new Schema({
    name: String,
    ingredients: Array
});

module.exports = mongoose.model('Food', FoodSchema);
