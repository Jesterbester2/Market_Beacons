var express = require('express');

var router = express.Router();

// Getting the Beacon Controller that we just created

var BeaconController = require('../../controller/beacon');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'ilikeraspberryicedtea',
  userProperty: 'payload'
});


// Map each API to the Controller FUnctions



router.get('/',auth,BeaconController.getBeacons);

router.post('/', auth,BeaconController.createBeacon);



router.put('/', auth,BeaconController.updateBeacon);

router.delete('/:Id',auth, BeaconController.removeBeacon);


// Export the Router
module.exports = router;
