// Gettign the Newly created Mongoose Model we just created
var Upload = require('../model/upload')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getUploads = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error

    try {
        var uploads = await Upload.find(query)

        // Return the uploadd list that was retured by the mongoose promise
        return uploads;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Uploads')
    }
}

exports.createUpload = async function(upload){

    // Creating a new Mongoose Object by using the new keyword
    var newUpload = new Upload({
      name: req.file.originalname,
      filetype: req.file.mimetype,
      storedname: req.file.filename,
      link: '/uploads/images/' + req.file.filename,
      filepath: 'public/uploads/images/',
      createdby: req.payload._id,
      active: true
    })

    try{

        // Saving the Upload
        var savedUpload = await newUpload.save()

        return savedUpload;
    }catch(e){

        // return a Error message describing the reason
        throw Error("Error while Creating Upload")
    }
}

exports.updateUpload = async function(upload){
    var id = upload.id

    try{
        //Find the old Upload Object by the Id

        var oldUpload = await Upload.findByIdAndUpdate(id, upload);
    }catch(e){

        throw Error("And Error occured while updating the Upload");
    }
}

exports.deleteUpload = async function(id){

    // Delete the Upload
    try{
        var deleted = await Upload.remove()

        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Upload")
    }
}
