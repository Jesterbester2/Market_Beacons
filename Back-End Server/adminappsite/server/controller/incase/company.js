var Company = require('../model/company');
var errorhandle = require('./errorsend');







/*
 *
 * Creates new company entery in Database
 * url: post ./api/company
 *
 */
exports.createCompany = function(req, res) {
  var newCompany = new Company(req.body);
  newCompany.save(function(err) {
    errorhandle.error(err, newCompany, res);
  });
};



/*
 *
 * Searches Database for list companys, returns list
 * url: get ./api/company
 *
 */
exports.getCompany = function(req, res) {
  Company.find({})
    //.populate()
    .exec(function(err, company) {
      errorhandle.error(err, company, res);
    });
};




/*
 *
 * Searches Database for company based on id, then updates based on body
 * url: put  ./api/company
 */
 exports.updateCompany = function(req, res) {
   edit = req.body;

     var id = edit._id

     var company = {
       name: edit.name,
       active: edit.active
     }

     Company.findByIdAndUpdate(id, company, {
       new: true
     }, (err, company) => {


         errorhandle.error(err, company, res);



   });



 };



/*
 *
 * Searches Database for company based on id, then removes from collection
 * url: delete ./api/company/:id
 *
 */
exports.removeCompany = function(req, res) {
  Company.findByIdAndRemove(req.params.Id, function(err, company) {
    errorhandle.error(err, "company removed", res);
  });
};
