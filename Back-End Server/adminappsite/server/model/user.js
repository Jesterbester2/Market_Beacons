var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var mongoosePaginate = require('mongoose-paginate');
//var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: {
      type: String,
      require: true,
      unique: true
            },
    password: {
      type: String,
      require: true
            },
    email: {
      type: String,
      require: true,
      unique: true
            },
    companyid: {
      type: Schema.Types.ObjectId,
      ref:'Company'
            },
    active: {
      type: Boolean
    },
    role: {
      type: String,
      enum: ['Admin', 'Company', 'User'],
     default: 'User',
      require: true
            }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return err;
        }

         return isMatch;
    });
};

UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    role: this.role,
    companyid: this.companyid,
    exp: parseInt(expiry.getTime() / 1000)
  }, "ilikeraspberryicedtea"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};
module.exports = mongoose.model('User', UserSchema);
