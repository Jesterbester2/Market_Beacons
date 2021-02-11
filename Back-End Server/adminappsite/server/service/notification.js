// Gettign the Newly created Mongoose Model we just created
var Noti = require('../model/notification')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getNotis = async function(query){

    // Options setup for the mongoose paginate


    // Try Catch the awaited promise to handle the error

    try {
        var notifications = await Noti.find(query).populate('mediapath tagid')

        // Return the notificationd list that was retured by the mongoose promise
        return notifications;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Notis')
    }
}

exports.createNoti = async function(notification){





    // Creating a new Mongoose Object by using the new keyword
    var newNoti = new Noti({
      name: notification.name,
      description: notification.description,
      mediapath: notification.mediapath,
      tagid: notification.tagid,
      active: true,
      daterange: notification.daterange,
      startdate: notification.startdate,
      enddate: notification.enddate,
      createdbyid: notification.createdbyid,
      notidata: notification.dataid
    })

    try{

        // Saving the Noti
        var savedNoti = await newNoti.save()

        return savedNoti;
    }catch(e){

        // return a Error message describing the reason
        throw Error(e)
    }
}

exports.updateNoti = async function(notification){
    var id = notification.id

    try{
        //Find the old Noti Object by the Id

        var oldNoti = await Noti.findByIdAndUpdate(id, notification);
    }catch(e){
        throw Error("Error occured while Finding the Noti")

        throw Error("And Error occured while updating the Noti");
    }
}

exports.deleteNoti = async function(id){

    // Delete the Noti
    try{
        var deleted = await Noti.remove({_id: id})

        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Noti")
    }
}
