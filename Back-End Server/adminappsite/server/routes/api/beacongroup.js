var express = require('express');

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'ilikeraspberryicedtea',
  userProperty: 'payload'
});

var router = express.Router();

// Getting the BeaconGroup Controller that we just created

var BeaconGroupController = require('../../controller/beacongroup');


// Map each API to the Controller FUnctions

router.get('/', auth,BeaconGroupController.getBeaconGroup);

router.get('/select',  auth, BeaconGroupController.getBeaconGroupBasedOnCompany);

router.post('/',  auth, BeaconGroupController.createBeaconGroup);

router.put('/',  auth, BeaconGroupController.updateBeaconGroup);

router.delete('/:Id', auth, BeaconGroupController.removeBeaconGroup);

// Export the Router

module.exports = router;
