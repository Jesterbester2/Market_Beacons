var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
//var passportLocalMongoose = require('passport-local-mongoose');

var beacon = new Schema({
    beaconID: {
      type: Number,
      require: true,
      unique: true
            },
    name: {
      type: String,
      require: true
            },
    brand:{
      type:String
    },
    beacongroupid: {
      type: Schema.ObjectId,
      ref:'Beacongrp'
            },
    strength: {
      type: Number
    },
    beacondata: {
      type: Schema.ObjectId,
      ref: 'Data'
    }
});

beacon
.virtual('url')
.get(function () {
  return '/main/beacon/' + this._id;
});
//Account.plugin(passportLocalMongoose);

 module.exports = mongoose.model('Beacon', beacon);
