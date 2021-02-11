// Gettign the Newly created Mongoose Model we just created
var Company = require('../model/company')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getCompanys = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error

    try {
        var companys = await Company.find(query)

        // Return the companyd list that was retured by the mongoose promise
        return companys;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Companys')
    }
}

exports.createCompany = async function(company){

    // Creating a new Mongoose Object by using the new keyword
    var newCompany = new Company({
        name: company.name,
        active: company.active

    })

    try{

        // Saving the Company
        var savedCompany = await newCompany.save()

        return savedCompany;
    }catch(e){

        // return a Error message describing the reason
        throw Error("Error while Creating Company")
    }
}

exports.updateCompany = async function(company){
    var id = company.id

    try{
        //Find the old Company Object by the Id

        var oldCompany = await Company.findByIdAndUpdate(id, company);
    }catch(e){

        throw Error("And Error occured while updating the Company");
    }
}

exports.deleteCompany = async function(id){

    // Delete the Company
    try{
        var deleted = await Company.remove({_id: id})

        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Company")
    }
}
