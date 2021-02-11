var Noti = require('../model/notification');
var errorhandle = require('./errorsend');





/*
 *
 * Creates new notification entery in Database
 * url: post ./api/notification
 *
 */
exports.createNotification = function(req, res) {

//console.log(req.body.mediapath);

  var newnote = {
    name: req.body.name,
    description: req.body.description,
    mediapath: req.body.mediapath,
    tagid: req.body.tagid,
    active: true,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    createdbyid: req.payload._id
  }
  var newNoti = new Noti(newnote);
  newNoti.save(function(err) {
    errorhandle.error(err, newNoti, res);
  });
};


/*
 *
 * Searches Database for list notifications, returns list
 * url: get ./api/notification
 *
 */



exports.getNotifications = function(req, res) {

  /*if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {*/
    //console.log(req.payload._id);
  Noti.find({})
    .populate('mediapath tagid')
    .exec(function(err, notification) {

      //console.log(notification);
      errorhandle.error(err, notification, res);
    });
  //}
};






exports.getNotification = function(req, res) {
  Noti.find({_id: req.params.Id})
    .populate('createdbyid tagid')
    .exec(function(err, notification) {

      //console.log(notification);
      errorhandle.error(err, notification, res);
    });
};

/*
 *
 * Searches Database for notification based on id, then updates based on body
 * url: put  ./api/notification
 */


 exports.updateNotification = function(req, res) {

   edit = req.body;

console.log(req.body);

     var id = edit._id

     var notification = {
       name: edit.name,
       description: edit.description,
       mediapath: edit.uploadid,
       tagid: edit.tagid._id,
       active: edit.active,
       startdate: edit.startdate,
       enddate: edit.enddate
     }

     Noti.findByIdAndUpdate(id, notification, {
       new: true
     }, (err, notification) => {


         errorhandle.error(err, notification, res);





   });



 };


/*
 *
 * Searches Database for notification based on id, then removes from collection
 * url: delete ./api/notification/:id
 *
 */

exports.removeNotification = function(req, res) {
  //Noti.remove({},function(err, notification){errorhandle.error(err, "users removed", res);});


  Noti.findByIdAndRemove(req.params.Id, function(err, notification) {
    errorhandle.error(err, "notification removed", res);
  });
};
