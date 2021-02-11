var express = require('express');

var router = express.Router();

// Getting the Upload Controller that we just created

var UploadController = require('../../controller/upload');
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

router.get('/get/:Id',  auth,UploadController.getUpload);


router.get('/user',  auth,UploadController.getUserUpload)

router.get('/entry/',UploadController.getUploadEntry);

router.post('/', auth,UploadController.createUpload);

router.put('/', UploadController.updateUpload);

router.delete('/:Id',UploadController.removeUpload);

// Export the Router

module.exports = router;
