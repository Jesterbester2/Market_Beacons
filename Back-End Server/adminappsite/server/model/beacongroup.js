var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
//var passportLocalMongoose = require('passport-local-mongoose');

var beacongroup = new Schema({
    name: {
      type: String,
      require: true
            },
    companyid: {
      type: Schema.ObjectId,
      ref:'Company'
            },
    purpose: {
      type: Schema.ObjectId,
      ref:'Purpose'
            },
    description: {
      type: String,
      require: true
            }
});


//Account.plugin(passportLocalMongoose);

 module.exports = mongoose.model('Beacongrp', beacongroup);
