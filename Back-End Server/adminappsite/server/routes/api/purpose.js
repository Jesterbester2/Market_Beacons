var express = require('express');

var router = express.Router();

// Getting the Purpose Controller that we just created

var PurposeController = require('../../controller/purpose');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'ilikeraspberryicedtea',
  userProperty: 'payload'
});


// Map each API to the Controller FUnctions

router.get('/',auth, PurposeController.getPurpose);

router.post('/', auth,PurposeController.createPurpose);

router.put('/', auth,PurposeController.updatePurpose);

router.delete('/:Id',auth,PurposeController.removePurpose);

// Export the Router

module.exports = router;
