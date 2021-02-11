var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');
var mongoosePaginate = require('mongoose-paginate');
var notificationgroup = new Schema({
    name: {
      type: String,
      require: true
            },
    description: {
      type: String
            },
    beacongroupid: {
      type: Schema.ObjectId,
      ref:'Beacongrp'
            },
    notificationid: [{
      type: Schema.ObjectId,
      ref: 'Noti'
    }],
    createdbyid: {
      type: Schema.Types.ObjectId,
      ref:'User'
            }
});

notificationgroup
.virtual('url')
.get(function () {
  return '/main/notifigrp/' + this._id;
});
//Account.plugin(passportLocalMongoose);


module.exports = mongoose.model('NotiGrp', notificationgroup);
