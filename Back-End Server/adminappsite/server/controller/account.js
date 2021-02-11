var User = require('../model/user');
var errorhandle = require('./errorsend');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport');
var express = require('express');
var jwt = require('jsonwebtoken');








exports.login = function(req, res) {
  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    console.log(err);
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      console.log(token);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};

exports.registerUser = function(req, res) {
    if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User(req.body);
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
};
