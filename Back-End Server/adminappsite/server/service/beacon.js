// Gettign the Newly created Mongoose Model we just created
var Beacon = require('../model/beacon')


// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getBeacons = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error

    try {
       beacons = await Beacon.find(query).populate('beacongroupid')

        // Return the beacond list that was retured by the mongoose promise

        return beacons;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Beacons')
    }
}




exports.createBeacon = async function(beacon){



    // Creating a new Mongoose Object by using the new keyword
    var newBeacon = new Beacon({
        name: beacon.name,
        beaconID: beacon.beaconID,
        brand: beacon.brand,
        beacongroupid: beacon.beacongroupid,
        strength: beacon.strength,
        beacondata: beacon.dataid
})
//console.log(newBeacon);
    try{

        // Saving the Beacon
        var savedBeacon = await newBeacon.save()

        return savedBeacon;
    }catch(e){

        // return a Error message describing the reason
        throw Error("Error while Creating Beacon")
    }
}

exports.updateBeacon = async function(beacon){
    var id = beacon.id

    try{
        //Find the old Beacon Object by the Id

        var oldBeacon = await Beacon.findByIdAndUpdate(id, beacon);
    }catch(e){
        throw Error("And Error occured while updating the Beacon");
    }
}

exports.deleteBeacon = async function(id){

    // Delete the Beacon
    try{
        var deleted = await Beacon.remove({_id: id})
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Beacon")
    }
}
