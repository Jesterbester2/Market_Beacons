// Accessing the Service that we just created

var UploadService = require('../service/upload')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getUpload = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try{

        var uploads = await UploadService.getUploads({}, page, limit)

        // Return the uploads list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({status: 200, data: uploads, message: "Succesfully Uploads Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }
}

exports.createUpload = async function(req, res, next){

    // Req.Body contains the form submit values.

    var upload = {
      name: req.file.originalname,
      filetype: req.file.mimetype,
      storedname: req.file.filename,
      link: '/uploads/images/' + req.file.filename,
      filepath: 'public/uploads/images/',
      createdby: req.payload._id,
      active: true
    }

    try{

        // Calling the Service function with the new object from the Request Body

        var createdUpload = await UploadService.createUpload(upload)
        return res.status(201).json({status: 201, data: createdUpload, message: "Succesfully Created ToDo"})
    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: "Upload Creation was Unsuccesfull"})
    }
}

exports.updateUpload = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var upload = {
        id,
        name: req.body.originalname,
        filetype: req.body.mimetype,
        storedname: req.body.filename,
        link: req.body.link,
        filepath: req.body.filepath,
        active: req.body.active
    }

    try{
        var updatedUpload = await UploadService.updateUpload(upload)
        return res.status(200).json({status: 200, data: updatedUpload, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUpload = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await UploadService.deleteUpload(id)
        return res.status(204).json({status:204, message: "Succesfully Upload Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
