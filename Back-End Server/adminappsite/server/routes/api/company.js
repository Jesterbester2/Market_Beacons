var express = require('express');

var router = express.Router();

// Getting the Company Controller that we just created

var CompanyController = require('../../controller/company');
function getTokenFromHeaders(req){
console.log(req.headers.authorization);
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
console.log(req.headers.authorization);
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

router.get('/', auth,CompanyController.getCompany);

router.post('/',auth,CompanyController.createCompany);

router.put('/', auth,CompanyController.updateCompany);

router.delete('/:Id',auth,CompanyController.removeCompany);

// Export the Router

module.exports = router;
