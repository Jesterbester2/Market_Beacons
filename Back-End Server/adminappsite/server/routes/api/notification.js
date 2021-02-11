var express = require('express');

var router = express.Router();

// Getting the Notification Controller that we just created

var NotificationController = require('../../controller/notification');
var jwt = require('express-jwt');

function getTokenFromHeaders(req){
//console.log(req.headers.authorization);
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
//console.log(req.headers.authorization);
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}
var auth = jwt({
  secret: 'ilikeraspberryicedtea',
  userProperty: 'payload',
  getToken: getTokenFromHeaders
});

// Map each API to the Controller FUnctions

router.get('/',auth, NotificationController.getNotifications);

//router.get('/detail/:Id', auth,NotificationController.getNotification);

router.post('/', auth,NotificationController.createNotification);

router.put('/', auth, NotificationController.updateNotification);

router.delete('/:Id' ,auth, NotificationController.removeNotification);

// Export the Router

module.exports = router;
