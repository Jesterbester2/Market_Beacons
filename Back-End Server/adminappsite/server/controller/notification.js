// Accessing the Service that we just created

var NotificationService = require('../service/notification')
var DataService = require('../service/data')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getNotifications = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try{

        var notifications = await NotificationService.getNotis({createdbyid: req.payload._id})

        // Return the notifications list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({status: 200, data: notifications, message: "Succesfully Notifications Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }

}

exports.createNotification = async function(req, res, next){
  console.log(req.body);
  try{
    var data = await DataService.createData("")

  }catch(e){
    throw Error('Error while creating data')
  }
    // Req.Body contains the form submit values.

    var notification = {
      name: req.body.name,
      description: req.body.description,
      mediapath: req.body.mediapath._id,
      tagid: req.body.tagid._id,
      active: true,
      daterange: req.body.daterange,
      startdate: req.body.daterange[0],
      enddate: req.body.daterange[1],
      dataid: data._id,
      createdbyid: req.payload._id
    }

console.log(notification);
    try{

        // Calling the Service function with the new object from the Request Body

        var createdNotification = await NotificationService.createNoti(notification)
        return res.status(201).json({status: 201, data: createdNotification, message: "Succesfully Created ToDo"})
    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message:e.message})
    }
}

exports.updateNotification = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    //console.log(req.body)

    var notification = {
        id,
        name: req.body.name ,
        description: req.body.description ,
        mediapath: req.body.mediapath,
        tagid: req.body.tagid ,
        active: req.body.active ,
        daterange: req.body.daterange,
        startdate: req.body.daterange[0],
        enddate: req.body.daterange[1]
          }

    try{
        var updatedNotification = await NotificationService.updateNoti(notification)
        return res.status(200).json({status: 200, data: updatedNotification, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeNotification = async function(req, res, next){

    var id = req.params.Id;

    try{
        var deleted = await NotificationService.deleteNoti(id)
        return res.status(204).json({status:204, message: "Succesfully Notification Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
