var Upload = require('../model/upload');
var Thumbnail = require('thumbnail');
var errorhandle = require('./errorsend');
var multer  = require('multer');
var path = require('path');
var gm = require('gm').subClass({imageMagick: true});
var storage = multer.diskStorage({
destination: function(req, file, cb) {
    cb(null, './public/uploads/images/')
},
filename: function(req, file, cb) {
    cb(null, file.fieldname+ '_' + Date.now() + path.extname(file.originalname))
   }
});


var upload = multer({ storage: storage,
  fileFilter: function(req, file, callback) {
			var ext = path.extname(file.originalname)
			if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.mp4') {
				return callback(res.end('Only images are allowed'), null)
			}
			callback(null, true)
		}
}).single('file');

var upload = multer({ storage: storage }).single('file');


/*
 *
 * Creates new upload entery in Database
 * url: post ./api/upload
 *
 */
exports.createUpload = async function(req, res) {


  upload(req, res, function(err) {

    var fileupload = {
      name: req.file.originalname,
      filetype: req.file.mimetype,
      storedname: req.file.filename,
      link: '/uploads/images/' + req.file.filename,
      thumbnail:'/uploads/thumbnails/' + req.file.filename,
      filepath: 'public/uploads/images/',
      createdby: req.payload._id,
      active: true
    };
    var filenm = req.file.filename;
      var newUpload = new Upload(fileupload);
    newUpload.save(function(err) {
      console.log(filenm);
//thumbnail.ensureThumbnail(filenm , 100, 100, function (err, filename) {

  gm('./public/uploads/images/'+ filenm)
  .resize(240, 240)
  //.noProfile()
  .write('./public/uploads/thumbnails/'+ filenm, function (err) {
    errorhandle.errorconsole( err, 'thumbnail of ' + req.file.filename + 'was saved');
  });

    errorhandle.errorconsole(err, 'file saved');

    });
    console.log(newUpload);
    errorhandle.error(err, newUpload, res);
      // Everything went fine
    });
};


/*
 *
 * Searches Database for list uploads, returns list
 * url: get ./api/upload
 *
 */



exports.getUpload = function(req, res) {


  var options = {
root: '/usr/src/app/server/public/uploads/images'
};
var name = req.params.Id;
  res.sendFile(name, options,function(err) {
    errorhandle.errorconsole(err, 'file sent');
  });

};


exports.getUserUpload = function (req, res) {
  if (!req.payload._id) {
      res.status(401).json({
        "message" : "UnauthorizedError: private profile"
      });
    } else {
  Upload.find({createdby: req.payload._id})
      .exec(function(err, upload) {

        errorhandle.error(err, upload, res);
        });
      }
};



exports.getUploadEntry = function(req, res) {
  Upload.find({})
    .exec(function(err, upload) {

      //console.log(upload);
      errorhandle.error(err, upload, res);
    });
};

/*
 *
 * Searches Database for upload based on id, then updates based on body
 * url: put  ./api/upload
 */




 exports.updateUpload = function(req, res) {

   edit = req.body;


     var id = edit._id

     var upload = {
       name: edit.name,
       filetype: edit.filetype,
       filepath: edit.filepath,
       dateuploaded: edit.dateuploaded,
       link: edit.link,
       ownedby: edit.ownedby,
       active: edit.active
     }

     Upload.findByIdAndUpdate(id, upload, {
       new: true
     }, (err, upload) => {

         errorhandle.error(err, "upload updated", res);



   });


 };


/*
 *
 * Searches Database for upload based on id, then removes from collection
 * url: delete ./api/upload/:id
 *
 */

exports.removeUpload = function(req, res) {
Upload.remove({},function(err, upload){errorhandle.error(err, "users removed", res);});

  //Upload.findByIdAndRemove(req.params.Id, function(err, upload) {
  //  errorhandle.error(err, "upload removed", res);
  //});
};
