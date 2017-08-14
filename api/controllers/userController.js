'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');
  var mongodb = require('mongodb');
  var axios      = require('axios');
exports.get_all_users = function(req, res) {
   console.log("Hi, get");
   var user = new User();
   user.name = "Pepi";
   res.json(user);
};
exports.register_user = function(req, res) {
  console.log("req.body.name: " + req.query.name );
  if (!req.query.name || !req.query.password) {
      res.json({success: false, msg: 'Please pass name and password.'});
    } else {
      var newUser = new User({
        name: req.query.name,
        password: req.query.password
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Username already exists.'});
        }
        res.json({success: true, msg: 'Successful created new user.'});
      });
    }
};
