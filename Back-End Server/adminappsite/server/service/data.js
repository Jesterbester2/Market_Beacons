// Gettign the Newly created Mongoose Model we just created
var Data = require('../model/data')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getDatas = async function(query){

    // Options setup for the mongoose paginate


    // Try Catch the awaited promise to handle the error

    try {
        var datas = await Data.find(query)

        // Return the datad list that was retured by the mongoose promise
        return datas;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Datas')
    }
}






var date1 = new Date(Date.now());
date1.setHours(0,0,0,0);

exports.createData = async function(data){

    // Creating a new Mongoose Object by using the new keyword

//console.log(date1);

    var newData = new Data({
      data: [
            {date: date1,
            count: 0}
      ]
    })

    try{

        // Saving the Data
        var savedData = await newData.save()

        return savedData;

    }catch(e){

        // return a Error message describing the reason
        throw Error("Error while Creating Data")
    }
}



exports.createDataSet = async function(dataId, newdate){

  var fieldsToPush = {
    $push: {data:{
      date: newdate,
      count: 0
    }}
  }
try{
 var datadone = await Data.findByIdAndUpdate({_id: dataId}, fieldsToPush)
 return datadone;

}catch(e){
  throw Error("Error while Creating Data")
}

}

exports.createFakeDataSet = async function(dataId, newdate, num){
//console.log(num);
//console.log(newdate);
//console.log(dataId);
  var fieldsToPush = {
    $push: {data:{
      date: newdate,
      count: num
    }}
  }
try{
 var datadone = await Data.findByIdAndUpdate({_id: dataId}, fieldsToPush)
 return datadone;

}catch(e){
  throw Error("Error while Creating Data")
}

}

exports.updateCount = async function(dataId, date3){

  //console.log(date3);
  var query = {_id: dataId, 'data.date': date3 };
    var fieldsToSet={$inc: {'data.$.count': 1}};

    //console.log('yes its the query');
//console.log(query);
    var options = {upsert: true};

    try{
        //Find the old Data Object by the Id
        var counted = await Data.findOneAndUpdate({_id: dataId, 'data.date': date3 }, fieldsToSet)
      //console.log(counted);
        return counted;

    }catch(e){


          throw Error("Error while Creating Data")

    }
}

exports.deleteData = async function(id){

    // Delete the Data
    try{
        var deleted = await Data.remove({_id: id})

        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Data")
    }
}
