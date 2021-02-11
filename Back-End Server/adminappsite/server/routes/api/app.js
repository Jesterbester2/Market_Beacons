var express = require('express');

var router = express.Router();

// Getting the Beacon Controller that we just created

var AppController = require('../../controller/app');



router.post('/',AppController.getPhoneNotis);
router.post('/noti/',AppController.didUserClick);

module.exports = router;
