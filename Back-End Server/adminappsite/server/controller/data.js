// Accessing the Service that we just created

var DataService = require('../service/data')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getData = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value


    try{

        var datas = await DataService.getDatas({})

        // Return the datas list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({status: 200, data: datas, message: "Succesfully Datas Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }
}

exports.createData = async function(req, res, next){

    // Req.Body contains the form submit values.

    var data = {
      name: req.body.name,
      active: req.body.active
    }

    try{

        // Calling the Service function with the new object from the Request Body

        var createdData = await DataService.createData(data)
        return res.status(201).json({status: 201, data: createdData, message: "Succesfully Created ToDo"})
    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: "Data Creation was Unsuccesfull"})
    }
}

exports.getGraphData = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    try{

//console.log(req.body.dataid);

        var graphdatas = await DataService.getDatas({_id: {$in: req.body.dataid}})


          //console.log(graphdatas);

return res.status(200).json({status: 200, data: graphdatas, message: "Succesfully GraphDatas Recieved"});
        // Return the graphdatas list with the appropriate HTTP Status Code and Message.



    }catch(e){

        //Return an Error Response Message with Code and the Error Message.
          return res.status(400).json({status: 400, message: "Data Creation was Unsuccesfull"})


    }












}


exports.makeFakeData = async function(req, res, next){

    // Id is necessary for the update

var dataids = req.body.dataids
var datelist = req.body.dates

var num
    dataids.forEach(async function(data) {
      datelist.forEach(async function(date2) {
        num = Math.floor(Math.random() * 20);
        //console.log(num);
      try{
        //console.log(data);
  var datadone =await DataService.createFakeDataSet(data, new Date(date2), num);
  //console.log("its was made");
  return res.status(200).json({status: 200, data: datadone, message: "Succesfully Updated Tod"})

      }catch(e){
return res.status(400).json({status: 400., message: e.message})      }
    });

  });




}



exports.updateData = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    //console.log(req.body)

    var data = {
        id,
        name: req.body.name,
        active: req.body.active

    }

    try{
        var updatedData = await DataService.updateData(data)
        return res.status(200).json({status: 200, data: updatedData, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeData = async function(req, res, next){

    var id = req.params.Id;

    try{
        var deleted = await DataService.deleteData(id)
        return res.status(204).json({status:204, message: "Succesfully Data Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
