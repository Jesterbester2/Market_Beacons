var BeaconGrp = require('../model/beacongroup');
var errorhandle = require('./errorsend');






/*
 *
 * Creates new Beacon entery in Database
 * url: post ./api/beacon
 *
 */
exports.createBeaconGroup = function(req, res) {

  var newBeaconGrp = new BeaconGrp(req.body);
  newBeaconGrp.save(function(err) {
    errorhandle.error(err, newBeaconGrp, res);
  });
};

/*
 *
 * Searches Database for list of beacongroups, returns list
 * url: get ./api/beacongroup
 *
 */

exports.getBeaconGroup = function(req, res) {

  /*if (!req.payload._id) {
      res.status(401).json({
        "message" : "UnauthorizedError: private profile"
      });
    } else {*/
  BeaconGrp.find({})
    .populate('companyid purpose')
    .exec(function(err, beacongroup) {
      errorhandle.error(err, beacongroup, res);
    });
  //}
};

/*
 *
 * Searches Database for beacongroup based on id, then updates based on body
 * url: put  ./api/beacongroup
 */
 exports.updateBeaconGroup = function(req, res) {

   edit = req.body;
     var id = edit._id

     var beacongroup = {
       name: edit.name,
       companyid: edit.companyid,
       purposeid: edit.purposeid,
       description: edit.description
     }

     BeaconGrp.findByIdAndUpdate(id, beacongroup, {
       new: true
     }, (err, beacongroup) => {


         errorhandle.error(err, beacongroup, res);



   });



 };



/*
 *
 * Searches Database for beacongroup based on id, then removes from collection
 * url: delete ./api/beacongroup/:id
 *
 */
exports.removeBeaconGroup = function(req, res) {
  //BeaconGrp.remove({},function(err, beacongroup){errorhandle.error(err, "users removed", res);});
  BeaconGrp.findByIdAndRemove(req.params.Id, function(err, beacongroup) {
    errorhandle.error(err, "beacongroup removed", res);
  });
};
