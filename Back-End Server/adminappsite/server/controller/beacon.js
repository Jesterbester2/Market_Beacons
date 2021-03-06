// Accessing the Service that we just created

var BeaconService = require('../service/beacon')
var DataService = require('../service/data')
// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getBeacons = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try{

        var beacons = await BeaconService.getBeacons({})

        // Return the beacons list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({status: 200, data: beacons, message: "Succesfully Beacons Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }
}

exports.createBeacon = async function(req, res, next){

    // Req.Body contains the form submit values.

    try{
      var data = await DataService.createData("")

    }catch(e){
      throw Error('Error while creating data')
    }


    var beacon = {
      name: req.body.name,
      beaconID: req.body.beaconID,
      brand: req.body.brand,
      beacongroupid: req.body.beacongroupid,
      strength: req.body.strength,
      dataid: data._id
    }

    try{

        // Calling the Service function with the new object from the Request Body

        var createdBeacon = await BeaconService.createBeacon(beacon)
        return res.status(201).json({status: 201, data: createdBeacon, message: "Succesfully Created ToDo"})
    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message})
    }
}


exports.updateBeacon = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    //console.log(req.body)

    var beacon = {
        id,
        name: req.body.name ,
        beaconID: req.body.beaconID ,
        brand: req.body.brand ,
        beacongroupid: req.body.beacongroupid ,
        strength: req.body.strength }

    try{
        var updatedBeacon = await BeaconService.updateBeacon(beacon)
        return res.status(200).json({status: 200, data: updatedBeacon, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeBeacon = async function(req, res, next){

    var id = req.params.Id;
      //console.log(id);

    try{
        var deleted = await BeaconService.deleteBeacon(id)
        return res.status(204).json({status:204, message: "Succesfully Beacon Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
