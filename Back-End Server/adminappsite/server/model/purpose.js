var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var beaconpurpose = new Schema({
    purpose: {
      type: String,
      require: true
    },
});

//Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Purpose', beaconpurpose);
