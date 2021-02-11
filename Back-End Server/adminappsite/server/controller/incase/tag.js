var Tag = require('../model/tag');
var errorhandle = require('./errorsend');




/*
 *
 * Creates new tag entery in Database
 * url: post ./api/tag
 *
 */
exports.createTag = function(req, res) {
  var newTag = new Tag(req.body);

  newTag.save(function(err) {
    errorhandle.error(err, newTag, res);
  });
};




/*
 *
 * Searches Database for list tags, returns list
 * url: get ./api/tag
 *
 */
exports.getTag = function(req, res) {
  Tag.find({})
    //.populate()
    .exec(function(err, tag) {
      errorhandle.error(err, tag, res);
    });
};


/*
 *
 * Searches Database for tag based on id, then updates based on body
 * url: put  ./api/tag
 */

exports.updateTag = function(req, res) {

  edit = req.body;


    var id = edit._id
console.log(id);
    var tag = {
      name: edit.name
    }

    Tag.findByIdAndUpdate(id, tag, {
      new: true
    }, (err, tag) => {


        errorhandle.error(err, tag, res);



  });



};


/*
 *
 * Searches Database for tag based on id, then removes from collection
 * url: delete ./api/tag/:id
 *
 */

exports.removeTag = function(req, res) {
  Tag.findByIdAndRemove(req.params.Id, function(err, tag) {
    errorhandle.error(err, "tag removed", res);
  });
};
