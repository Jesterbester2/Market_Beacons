// Accessing the Service that we just created

var PurposeService = require('../service/purpose')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getPurpose = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try{

        var purposes = await PurposeService.getPurposes()

        // Return the purposes list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({status: 200, data: purposes, message: "Succesfully Purposes Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }
}

exports.createPurpose = async function(req, res, next){

    // Req.Body contains the form submit values.

    var purpose = {
        purpose: req.body.purpose
    }

    try{

        // Calling the Service function with the new object from the Request Body

        var createdPurpose = await PurposeService.createPurpose(purpose)
        return res.status(201).json({status: 201, data: createdPurpose, message: "Succesfully Created ToDo"})
    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: "Purpose Creation was Unsuccesfull"})
    }
}

exports.updatePurpose = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    //console.log(req.body)

    var purpose = {
        id,
        purpose: req.body.purpose
    }

    try{
        var updatedPurpose = await PurposeService.updatePurpose(purpose)
        return res.status(200).json({status: 200, data: updatedPurpose, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removePurpose = async function(req, res, next){

    var id = req.params.Id;

    try{
        var deleted = await PurposeService.deletePurpose(id)
        return res.status(204).json({status:204, message: "Succesfully Purpose Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
