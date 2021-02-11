var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');
var mongoosePaginate = require('mongoose-paginate');
var company = new Schema({
    name: {
      type: String,
      require: true,
      unique: true
            },
    active: {
      type: Boolean
            }
});


//Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Company', company);
