// Accessing the Service that we just created

var CompanyService = require('../service/company')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getCompany = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try{

        var companys = await CompanyService.getCompanys({}, page, limit)

        // Return the companys list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({status: 200, data: companys, message: "Succesfully Companys Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }
}

exports.createCompany = async function(req, res, next){

    // Req.Body contains the form submit values.

    var company = {
      name: req.body.name,
      active: req.body.active
    }

    try{

        // Calling the Service function with the new object from the Request Body

        var createdCompany = await CompanyService.createCompany(company)
        return res.status(201).json({status: 201, data: createdCompany, message: "Succesfully Created ToDo"})
    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: "Company Creation was Unsuccesfull"})
    }
}

exports.updateCompany = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    //console.log(req.body)

    var company = {
        id,
        name: req.body.name,
        active: req.body.active

    }

    try{
        var updatedCompany = await CompanyService.updateCompany(company)
        return res.status(200).json({status: 200, data: updatedCompany, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeCompany = async function(req, res, next){

    var id = req.params.Id;

    try{
        var deleted = await CompanyService.deleteCompany(id)
        return res.status(204).json({status:204, message: "Succesfully Company Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
