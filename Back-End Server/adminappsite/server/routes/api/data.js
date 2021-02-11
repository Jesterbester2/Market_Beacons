var express = require('express');

var router = express.Router();

// Getting the Data Controller that we just created

var DataController = require('../../controller/data');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'ilikeraspberryicedtea',
  userProperty: 'payload'
});


// Map each API to the Controller FUnctions


router.get('/', DataController.getData);

router.post('/', DataController.createData);

router.post('/graph/', auth,DataController.getGraphData);

router.post('/faker/', DataController.makeFakeData);

router.put('/', DataController.updateData);

router.delete('/:Id', auth,DataController.removeData);


// Export the Router

module.exports = router;
