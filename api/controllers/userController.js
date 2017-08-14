'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');
  var mongodb = require('mongodb');
  var axios      = require('axios');
  var jwt         = require('jwt-simple');
  var config = require('../persistence/UserDAO');

var passport   = require('passport');
exports.get_all_users = function(req, res) {
  passport.authenticate('jwt', { session: false});
  console.log("header: " + req.get("authorization"));
  var token = req.get("authorization");
  //var token = getToken(token_pre);
    if (token) {
        console.log("if token yes:");
      var parted = token.split(' ');
      if (parted.length === 2) {
        console.log("if token yes and parted:" + parted[1]);
        var decoded = jwt.decode(parted[1], config.secret);
        User.findOne({
          name: decoded.name
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
              return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
              res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
            }
        });
      } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
      }
      } else {
        return null;
      }
};
exports.register_user = function(req, res) {
  console.log("req.body.name register: " + req.query.name );
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
exports.authenticate_user = function(req, res) {
  console.log("req.query.name authenticate: " + req.query.name);
  User.findOne({
      name: req.query.name
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.query.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.encode(user, config.secret);
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
};
exports.getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
