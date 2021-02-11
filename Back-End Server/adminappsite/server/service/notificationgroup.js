// Gettign the Newly created Mongoose Model we just created
var Notigrp = require('../model/notificationgroup')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getNotigrps = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error

    try {
        var notificationgroups = await Notigrp.find(query).populate('notificationid beacongroupid')

        // Return the notificationgroupd list that was retured by the mongoose promise
        return notificationgroups;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Notigrps')
    }
}

exports.createNotigrp = async function(notificationgroup){

    // Creating a new Mongoose Object by using the new keyword
    var newNotigrp = new Notigrp({
      name: notificationgroup.name,
      description: notificationgroup.description,
      notificationid: notificationgroup.notificationid,
      beacongroupid: notificationgroup.beacongroupid,
      createdbyid: notificationgroup.createdbyid
    })

    try{

        // Saving the Notigrp
        var savedNotigrp = await newNotigrp.save()

        return savedNotigrp;
    }catch(e){

        // return a Error message describing the reason
        throw Error("Error while Creating Notigrp")
    }
}

exports.updateNotigrp = async function(notificationgroup){
    var id = notificationgroup.id

    try{
        //Find the old Notigrp Object by the Id

        var oldNotigrp = await Notigrp.findByIdAndUpdate(id, notificationgroup);
    }catch(e){
        throw Error("Error occured while Finding the Notigrp")

        throw Error("And Error occured while updating the Notigrp");
    }
}

exports.deleteNotigrp = async function(id){

    // Delete the Notigrp
    try{
        var deleted = await Notigrp.remove({_id: id})

        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Notigrp")
    }
}
