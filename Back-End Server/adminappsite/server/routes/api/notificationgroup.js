var express = require('express');

var router = express.Router();

// Getting the NotificationGroup Controller that we just created

var NotificationGroupController = require('../../controller/notificationgroup');
function getTokenFromHeaders(req){
//console.log(req.headers.authorization);
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
//console.log(req.headers.authorization);
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'ilikeraspberryicedtea',
  userProperty: 'payload'
});


// Map each API to the Controller FUnctions

router.get('/', auth,NotificationGroupController.getNotificationGroup);

router.post('/', auth,NotificationGroupController.createNotificationGroup);

router.put('/', auth,NotificationGroupController.updateNotificationGroup);

router.delete('/:Id',auth, NotificationGroupController.removeNotificationGroup);

// Export the Router

module.exports = router;
