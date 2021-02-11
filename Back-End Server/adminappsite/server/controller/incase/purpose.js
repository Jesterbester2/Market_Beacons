var Purpose = require('../model/purpose');
var errorhandle = require('./errorsend');



/*
 *
 * Creates new purpose entery in Database
 * url: post ./api/purpose
 *
 */

exports.createPurpose = function(req, res) {
  var newPurpose = new Purpose(req.body);
  newPurpose.save(function(err) {
    errorhandle.error(err, newPurpose, res);
  });
};



/*
 *
 * Searches Database for list purposes, returns list
 * url: get ./api/purpose
 *
 */

exports.getPurpose = function(req, res) {
  Purpose.find({})
    //.populate()
    .exec(function(err, purpose) {
      errorhandle.error(err, purpose, res);
    });
};




/*
 *
 * Searches Database for purpose based on id, then updates based on body
 * url: put  ./api/purpose
 */

 exports.updatePurpose = function(req, res) {
   edit = [];
   edit = req.body;


     var id = edit._id

     var purpose = {
       purpose: edit.purpose
     }

     Purpose.findByIdAndUpdate(id, purpose, {
       new: true
     }, (err, purpose) => {



         errorhandle.error(err, purpose, res);


     });






 };


/*
 *
 * Searches Database for purpose based on id, then removes from collection
 * url: delete ./api/purpose/:id
 *
 */

exports.removePurpose = function(req, res) {
  Purpose.findByIdAndRemove(req.params.Id, function(err, purpose) {
    errorhandle.error(err, "purpose removed", res);
  });
};
