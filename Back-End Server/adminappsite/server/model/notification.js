var mongoose = require('mongoose');
var assert = require('assert');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
var notification = new Schema({
    name: {
      type: String,
      require:true
    },
    description:{
        type: String,
        required: true
    },
     mediapath: {
       type: Schema.ObjectId,
       ref:'Upload'
    },
    tagid: {
      type: Schema.ObjectId,
      ref:'Tag'
    },
    active: {
      type: Boolean
    },
    startdate: {
      type: Date,
      require: true
    },
    daterange:[{type: Date,
    require: true}],
    notidata: {
      type: Schema.ObjectId,
      ref: 'Data'
    },
    enddate: {
      type: Date,
      require: true
    },
    created:{
      type: Date,
      default: Date.now
    },
    createdbyid: {
      type: Schema.Types.ObjectId,
      ref:'User'
    }

  });
  notification.pre('remove', function(next){
      this.model('Data').remove(
          {_id: this.notidata},
          next
      );
  });






module.exports  = mongoose.model('Noti', notification);
