var express = require('express');
var router = express.Router();
var users = require('./api/user');
var companys = require('./api/company');
var tag = require('./api/tag');
var purpose = require('./api/purpose');
var notification = require('./api/notification');
var notificationgroup = require('./api/notificationgroup');
var beacon = require('./api/beacon');
var beacongroup = require('./api/beacongroup');
var upload = require('./api/upload');
var app = require('./api/app');
var data = require('./api/data');

console.log('1');
router.use('/user', users);
router.use('/app', app);
router.use('/company', companys);
router.use('/tag', tag);
router.use('/purpose', purpose);
router.use('/notification', notification);
router.use('/notificationgroup', notificationgroup);
router.use('/beacon', beacon);
router.use('/beacongroup', beacongroup);
router.use('/upload', upload);
router.use('/data', data);

module.exports = router;
