// Accessing the Service that we just created

var TagService = require('../service/tag')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getTag = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try{

        var tags = await TagService.getTags({})

        // Return the tags list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({status: 200, data: tags, message: "Succesfully Tags Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }
}

exports.createTag = async function(req, res, next){

    // Req.Body contains the form submit values.

    var tag = {
        name: req.body.name

    }

    try{

        // Calling the Service function with the new object from the Request Body

        var createdTag = await TagService.createTag(tag)
        return res.status(201).json({status: 201, data: createdTag, message: "Succesfully Created ToDo"})
    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: "Tag Creation was Unsuccesfull"})
    }
}

exports.updateTag = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    //console.log(req.body)

    var tag = {
        id,
        name: req.body.name

    }

    try{
        var updatedTag = await TagService.updateTag(tag)
        return res.status(200).json({status: 200, data: updatedTag, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeTag = async function(req, res, next){

    var id = req.params.Id;
console.log(id);
    try{
        var deleted = await TagService.deleteTag(id)
        return res.status(204).json({status:204, message: "Succesfully Tag Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
