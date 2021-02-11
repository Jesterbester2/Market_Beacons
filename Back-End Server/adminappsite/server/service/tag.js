// Gettign the Newly created Mongoose Model we just created
var Tag = require('../model/tag')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getTags = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error

    try {
        var tags = await Tag.find({})

        // Return the tagd list that was retured by the mongoose promise
        return tags;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Tags')
    }
}

exports.createTag = async function(tag){

    // Creating a new Mongoose Object by using the new keyword
    var newTag = new Tag({
        name: tag.name
    })

    try{

        // Saving the Tag
        var savedTag = await newTag.save()

        return savedTag;
    }catch(e){

        // return a Error message describing the reason
        throw Error("Error while Creating Tag")
    }
}

exports.updateTag = async function(tag){
    var id = tag.id

    try{
        //Find the old Tag Object by the Id

        var oldTag = await Tag.findByIdAndUpdate(id, tag);
    }catch(e){
        throw Error("Error occured while Finding the Tag")
    }


}

exports.deleteTag = async function(id){

    // Delete the Tag
    try{
        var deleted = await Tag.remove({_id: id})

        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Tag")
    }
}
