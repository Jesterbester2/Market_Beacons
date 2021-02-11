var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');
var mongoosePaginate = require('mongoose-paginate');
var upload = new Schema({
    name: {
      type: String,
            },
    storedname: {
      type: String
            },
    filetype: {
      type: String
            },
    filepath: {
      type: String
            },
    link: {
      type: String
            },
    thumbnail:{
      type: String
            },
    createdby: {
      type: Schema.Types.ObjectId,
      ref:'User'
            },
    dateuploaded: {
      type: Date,
      default: Date.now
            },
    active: {
      type: Boolean
            }
});


//Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Upload', upload);
