var express = require('express');

var router = express.Router();

// Getting the User Controller that we just created

var UserController = require('../../controller/user');
var AccountController = require('../../controller/account');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'ilikeraspberryicedtea',
  userProperty: 'payload'
});


// Map each API to the Controller FUnctions

router.get('/', auth,UserController.getUsers);

router.post('/register', AccountController.registerUser);

router.post('/', auth,UserController.createUser);

router.post('/login', AccountController.login);

router.put('/', auth,UserController.updateUser);

router.delete('/:Id', UserController.removeUser);

// Export the Router

module.exports = router;
