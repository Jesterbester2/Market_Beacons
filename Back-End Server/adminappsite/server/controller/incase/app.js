var ObjectId = require('mongoose').Types.ObjectId;
var Noti = require('../model/notification');
var NotiGrp = require('../model/notificationgroup');
var Beacon = require('../model/beacon');
var Beacongrp = require('../model/beacongroup');
var Tag = require('../model/tag');
var errorhandle = require('./errorsend');
var appservice = require('./appservice');
var Upload = require('../model/upload');

var async = require('async');



/*
 *
 * Searches Database for notification using beaconid then filters using tags, current date, and is Active
 * url: post ./api/app/list
 *
 */

exports.getAds = function(req, res) {

  async.waterfall([
    function beacontogroup(callback) {
      Beacon.find({
          beaconID: req.body.beaconID
        })
        .select('beacongroupid')
        .exec(function(err, results) {

          callback(err, results);
        });

    },
    function grouptonoti(lastResult, callback) {
      // arg1 now equals 'three'
      console.log(lastResult);
      NotiGrp.find({
          beacongroupid: lastResult[0].beacongroupid
        })
        .select('notificationid')
        .exec(function(err, results) {


          callback(err, results);
        });

    },
    function notificationfilter(lastResult, callback) {
      // arg1 now equals 'three'

      noti = lastResult[0].notificationid;
      console.log(noti);
      var nowDate = new Date();
      console.log(nowDate);
      Noti.find({
          _id: {
            $in: noti
          },
          tagid: {
            $in: req.body.tagid
          },
          active: true,
          startdate: {
            $lte: nowDate
          },
          enddate: {
            $gte: nowDate
          }
        })
        .populate('mediapath', 'link')
        //.populate('mediapath', 'link')
        .exec(function(err, results) {
          console.log(results);
          callback(err, results);
        });
    }


    //notificationtagfilter,
  ], function(err, result) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        status: 400,
        message: err
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: result,
        message: ""
      });
    }
  });

};


/*
 *
 * Searches Database for notification using beaconid then filters using tags, current date, and is Active. Then chooses one at random notification to deliver to the phone
 * url: post ./api/app/
 *
 */

exports.getAd = function(req, res) {


  async.waterfall([
    function beacontogroup(callback) {
      Beacon.find({
          beaconID: req.body.beaconID
        })
        .select('beacongroupid')
        .exec(function(err, results) {

          callback(err, results);
        });

    },
    function grouptonoti(lastResult, callback) {
      // arg1 now equals 'three'
      console.log(lastResult);
      NotiGrp.find({
          beacongroupid: lastResult[0].beacongroupid
        })
        .select('notificationid')
        .exec(function(err, results) {


          callback(err, results);
        });

    },
    function notificationfilter(lastResult, callback) {
      // arg1 now equals 'three'

      noti = lastResult[0].notificationid;
      //console.log(noti);
      var nowDate = new Date();
      //console.log(nowDate);
      Noti.find({
          _id: {
            $in: noti
          },
          tagid: {
            $in: req.body.tagid
          },
          active: true,
          startdate: {
            $lte: nowDate
          },
          enddate: {
            $gte: nowDate
          }
        })
        .populate('mediapath', 'link')
        .exec(function(err, results) {
  //console.log(results);
          var size = results.length;
          var rand = Math.floor(Math.random() * size);
          //console.log(results[rand]);
          callback(err, results[rand]);
        });
    }


    //notificationtagfilter,
  ], function(err, result) {
    if (err) {
      //console.log(err);
      return res.status(400).json({
        status: 400,
        message: err
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: result,
        message: ""
      });
    }
  });


};




/*function grouptogroup(last, callback) {
    // arg1 now equals 'one' and arg2 now equals 'two'
    callback(null, 'three');
}

function notificationtagfilter(arg1, callback) {
    // arg1 now equals 'three'
    callback(null, 'done');
}*/
