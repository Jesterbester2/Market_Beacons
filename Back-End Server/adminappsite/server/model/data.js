var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');
var mongoosePaginate = require('mongoose-paginate');

var datasetSchema = new Schema({
  date:{type: Date},
count:{type: Number,
  default: 0
}
},{_id: false});


var data = new Schema({
    data: [datasetSchema]
});


//Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Data', data);
