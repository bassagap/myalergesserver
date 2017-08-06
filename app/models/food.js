// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FoodSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Food', FoodSchema);
