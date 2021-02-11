var NotiGrp = require('../model/notificationgroup');
var errorhandle = require('./errorsend');


/*
 *
 * Creates new notificationgroup entery in Database
 * url: post ./api/notificationgroup
 *
 */

exports.createNotificationGroup = function(req, res) {
  console.log(req.body);
  var newnote = {
    name: req.body.name,
    description: req.body.description,
    notificationid: req.body.notificationid,
    beacongroupid: req.body.beacongroupid,
    createdbyid: req.payload._id
  }
  var newNotiGrp = new NotiGrp(newnote);
  newNotiGrp.save(function(err) {
    errorhandle.error(err, newNotiGrp, res);
  });
};


/*
 *
 * Searches Database for list notificationgroups, returns list
 * url: get ./api/notificationgroup
 *
 */

exports.getNotificationGroup = function(req, res) {
  NotiGrp.find({})
    .populate('notificationid beacongroupid')
    .exec(function(err, notificationgroup) {
      console.log(notificationgroup);
      errorhandle.error(err, notificationgroup, res);
    });
};





/*
 *
 * Searches Database for notificationgroup based on id, then updates based on body
 * url: put  ./api/notificationgroup
 */
 exports.updateNotificationGroup = function(req, res) {
   edit = req.body;

     var id = edit._id

     var notificationgroup = {
       name: edit.name,
       description: edit.description,
       beacongroupid: edit.beacongroupid,
       notificationid: edit.notificationid,
       createdbyid: edit.createdbyid
     }

     NotiGrp.findByIdAndUpdate(id, notificationgroup, {
       new: true
     }, (err, notificationgroup) => {


         errorhandle.error(err, notificationgroup, res);



   });



 };


/*
 *
 * Searches Database for notificationgroup based on id, then removes from collection
 * url: delete ./api/notificationgroup/:id
 *
 */

exports.removeNotificationGroup = function(req, res) {
  //NotiGrp.remove({},function(err, notificationgroup){errorhandle.error(err, "users removed", res);});


  NotiGrp.findByIdAndRemove(req.params.Id, function(err, notificationgroup) {
    errorhandle.error(err, "notificationgroup removed", res);
  });
};
