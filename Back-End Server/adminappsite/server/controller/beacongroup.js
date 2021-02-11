// Accessing the Service that we just created

var BeaconGroupService = require('../service/beacongroup')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getBeaconGroup = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try{

        var beacongroups = await BeaconGroupService.getBeaconGroups({}, page, limit)

        // Return the beacongroups list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({status: 200, data: beacongroups, message: "Succesfully BeaconGroups Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }
}

exports.getBeaconGroupBasedOnCompany = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
var query = {}
console.log(req.payload.companyid);
query={companyid: req.payload.companyid}



    try{

        var beacongroups = await BeaconGroupService.getBeaconGroups(query)

        // Return the beacongroups list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({status: 200, data: beacongroups, message: "Succesfully BeaconGroups Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }
}




exports.createBeaconGroup = async function(req, res, next){

    // Req.Body contains the form submit values.

    var beacongroup = {
      name: req.body.name,
      description: req.body.description,
      companyid: req.body.companyid,
      purpose: req.body.purpose
    }

    try{

        // Calling the Service function with the new object from the Request Body

        var createdBeaconGroup = await BeaconGroupService.createBeaconGroup(beacongroup)
        return res.status(201).json({status: 201, data: createdBeaconGroup, message: "Succesfully Created ToDo"})
    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: "BeaconGroup Creation was Unsuccesfull"})
    }
}

exports.updateBeaconGroup = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var beacongroup = {
        id,
        name: req.body.name ? req.body.name : null,
        description: req.body.description ? req.body.description : null,
        companyid: req.body.companyid ? req.body.companyid : null,
        purpose: req.body.purpose ? req.body.purpose : nullpurpose
    }

    try{
        var updatedBeaconGroup = await BeaconGroupService.updateBeaconGroup(beacongroup)
        return res.status(200).json({status: 200, data: updatedBeaconGroup, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeBeaconGroup = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await BeaconGroupService.deleteBeaconGroup(id)
        return res.status(204).json({status:204, message: "Succesfully BeaconGroup Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
