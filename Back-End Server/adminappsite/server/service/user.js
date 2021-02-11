// Gettign the Newly created Mongoose Model we just created
var User = require('../model/user')
var passport = require('passport');
var config = require('../config/database');
require('../config/passport');
var jwt = require('jsonwebtoken');
// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getUsers = async function(query){

    // Options setup for the mongoose paginate


    // Try Catch the awaited promise to handle the error

    try {
        var users = await User.find(query).populate('companyid')

        // Return the userd list that was retured by the mongoose promise
        return users;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Users')
    }
}

exports.createUser = async function(user){

    // Creating a new Mongoose Object by using the new keyword
    var newUser = new User({
        username: user.username,
        password: user.password,
        companyid: user.companyid,
        email: user.email,
        active: user.active,
        role: user.role
    })

    try{

        // Saving the User
        var savedUser = await newUser.save()

        return savedUser;
    }catch(e){

        // return a Error message describing the reason
        throw Error("Error while Creating User")
    }
}

function __promisifiedPassportAuthentication() {
    return new Promise((resolve, reject) => {

    })
}

exports.loginUser = async function(req, res ){
  try{
    passport.authenticate('local', function(err, user, info){
      var token;

      // If Passport throws/catches an error
      //console.log(err);
      if (err) {
        throw Error('Error in passport auth');
      }

      // If a user is found
      if(user){
        token = user.generateJwt();
          return token;

      } else {
        // If user is not found
        throw Error('Error in when generating jwt');
      }
    })(req, res);
}
catch(e){
  throw Error(e.message);
}
}
exports.updateUser = async function(user){
    var id = user.id

    try{
        //Find the old User Object by the Id

        var oldUser = await User.findByIdAndUpdate(id, user);
    }catch(e){
        throw Error("Error occured while Finding the User")
    }

    //
}

exports.deleteUser = async function(id){

    // Delete the User
    try{
        var deleted = await User.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("User Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the User")
    }
}
