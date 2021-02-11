// Accessing the Service that we just created

var NotificationgroupService = require('../service/notificationgroup')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getNotificationGroup = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try{

        var notificationgroups = await NotificationgroupService.getNotigrps({createdbyid: req.payload._id}, page, limit)

        // Return the notificationgroups list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({status: 200, data: notificationgroups, message: "Succesfully Notificationgroups Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }
}

exports.createNotificationGroup = async function(req, res, next){

    // Req.Body contains the form submit values.

    var notificationgroup = {
      name: req.body.name,
      description: req.body.description,
      notificationid: req.body.notificationid,
      beacongroupid: req.body.beacongroupid,
      createdbyid: req.payload._id
    }

    try{

        // Calling the Service function with the new object from the Request Body

        var createdNotificationgroup = await NotificationgroupService.createNotigrp(notificationgroup)
        return res.status(201).json({status: 201, data: createdNotificationgroup, message: "Succesfully Created ToDo"})
    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: "Notificationgroup Creation was Unsuccesfull"})
    }
}

exports.updateNotificationGroup = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    //console.log(req.body)

    var notificationgroup = {
        id,
        name: req.body.name ,
        description: req.body.description ,
        notificationid: req.body.notificationid ,
        beacongroupid: req.body.beacongroupid
    }

    try{
        var updatedNotificationgroup = await NotificationgroupService.updateNotigrp(notificationgroup)
        return res.status(200).json({status: 200, data: updatedNotificationgroup, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeNotificationGroup = async function(req, res, next){

    var id = req.params.Id;

    try{
        var deleted = await NotificationgroupService.deleteNotigrp(id)
        return res.status(204).json({status:204, message: "Succesfully Notificationgroup Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
