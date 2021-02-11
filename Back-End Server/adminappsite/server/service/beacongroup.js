// Gettign the Newly created Mongoose Model we just created
var BeaconGrp = require('../model/beacongroup')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getBeaconGroups = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error

    try {
        var beacongroups = await BeaconGrp.find(query).populate('companyid purpose')

        // Return the beacongroupd list that was retured by the mongoose promise
        return beacongroups;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating BeaconGrps')
    }
}



exports.createBeaconGroup = async function(beacongroup){

    // Creating a new Mongoose Object by using the new keyword
    var newBeaconGrp = new BeaconGrp({
        name: beacongroup.name,
        description: beacongroup.description,
        companyid: beacongroup.companyid,
        purpose: beacongroup.purpose
    })

    try{

        // Saving the BeaconGrp
        var savedBeaconGrp = await newBeaconGrp.save()

        return savedBeaconGrp;
    }catch(e){

        // return a Error message describing the reason
        throw Error("Error while Creating BeaconGrp")
    }
}

exports.updateBeaconGroup = async function(beacongroup){
    var id = beacongroup.id

    try{
        //Find the old BeaconGrp Object by the Id

        var oldBeaconGrp = await BeaconGrp.findByIdAndUpdate(id, beacongroup);
    }catch(e){
        throw Error("Error occured while Finding the BeaconGrp")

        throw Error("And Error occured while updating the BeaconGrp");
    }
}

exports.deleteBeaconGroup = async function(id){

    // Delete the BeaconGrp
    try{
        var deleted = await BeaconGrp.remove({_id: id})

        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the BeaconGrp")
    }
}
