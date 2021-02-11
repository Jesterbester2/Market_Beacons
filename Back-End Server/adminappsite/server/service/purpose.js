// Gettign the Newly created Mongoose Model we just created
var Purpose = require('../model/purpose')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getPurposes = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error

    try {
        var purposes = await Purpose.find(query)

        // Return the purposed list that was retured by the mongoose promise
        return purposes;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Purposes')
    }
}

exports.createPurpose = async function(purpose){

    // Creating a new Mongoose Object by using the new keyword
    var newPurpose = new Purpose({
        purpose: purpose.purpose
    })

    try{

        // Saving the Purpose
        var savedPurpose = await newPurpose.save()

        return savedPurpose;
    }catch(e){

        // return a Error message describing the reason
        throw Error("Error while Creating Purpose")
    }
}

exports.updatePurpose = async function(purpose){
    var id = purpose.id

    try{
        //Find the old Purpose Object by the Id

        var oldPurpose = await Purpose.findByIdAndUpdate(id, purpose);
    }catch(e){

        throw Error("And Error occured while updating the Purpose");
    }
}

exports.deletePurpose = async function(id){

    // Delete the Purpose
    try{
        var deleted = await Purpose.remove({_id: id})
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Purpose")
    }
}
