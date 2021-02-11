var Beacon = require('../model/beacon');
var errorhandle = require('./errorsend');

/*
 *
 * Creates new Beacon entery in Database
 * url: post ./api/beacon
 *
 */




exports.createBeacon = function(req, res) {
  var newBeacon = new Beacon(req.body);
  newBeacon.save(function(err) {
    errorhandle.error(err, newBeacon, res);
  });
};

/*
 *
 * Searches Database for list beacons, returns list
 * url: get ./api/beacon
 *
 */
exports.getBeacons = function(req, res) {
  /*if (!req.payload._id) {
      res.status(401).json({
        "message" : "UnauthorizedError: private profile"
      });
    } else {*/
  Beacon.find({})
    .populate('beacongroupid')
    .exec(function(err, beacon) {
      errorhandle.error(err, beacon, res);
    });
  //}
};



/*
 *
 * Searches Database for beacon based on id, then updates based on body
 * url: put  ./api/beacon
 */
 exports.updateBeacon = function(req, res) {
   edit = req.body;

     var id = edit._id

     var beacon = {
       name: edit.name,
       beaconID: edit.beaconID,
       brand: edit.brand,
       beacongroupid: edit.beacongroupid,
       strength: edit.strength
     }

     Beacon.findByIdAndUpdate(id, beacon, {
       new: true
     }, (err, beacon) => {


         errorhandle.error(err, beacon, res);



   });



 };

/*
 *
 * Searches Database for beacon based on id, then removes from collection
 * url: delete ./api/beacon/:id
 *
 */
exports.removeBeacon = function(req, res) {

  //Used to remove the entire collection dont do it
  //Beacon.remove({},function(err, beacon){errorhandle.error(err, "users removed", res);});

  Beacon.findByIdAndRemove(req.params.Id, function(err, beacon) {
    errorhandle.error(err, "beacon removed", res);
  });
};
