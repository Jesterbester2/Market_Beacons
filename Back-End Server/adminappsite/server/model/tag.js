var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');
var mongoosePaginate = require('mongoose-paginate');
var tag  = new Schema({
    name: {
      type: String,
      require: true
            }

});

//tag.plugin(mongoosePaginate);
//Account.plugin(passportLocalMongoose);


module.exports = mongoose.model('Tag', tag);
