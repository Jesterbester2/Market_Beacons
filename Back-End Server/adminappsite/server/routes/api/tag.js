var express = require('express');

var router = express.Router();

// Getting the Tag Controller that we just created

var TagController = require('../../controller/tag');

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

router.get('/',TagController.getTag);

router.post('/', auth,TagController.createTag);

router.put('/', auth,TagController.updateTag);

router.delete('/:Id',auth,TagController.removeTag);

// Export the Router

module.exports = router;
