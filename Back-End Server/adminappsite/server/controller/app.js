// Accessing the Service that we just created

var BeaconService = require('../service/beacon')
var DataService = require('../service/data')
var NotificationgroupService = require('../service/notificationgroup')
var NotificationService = require('../service/notification')
var schedule = require('node-schedule');
var TagService = require('../service/tag')

// Saving the context of this module inside the _the variable


var j = schedule.scheduleJob('0 0 * * * ', myAsyncCB)
async function myAsyncCB(){
  try{
    var dataneeddate = await DataService.getDatas({})
    //console.log(dataneeddate);
  } catch (e) {
    //console.error(e);
  }
  var date2 = new Date(Date.Now());
  date2.setHours(0,0,0,0);





  dataneeddate.forEach(async function(data) {
    try{
      //console.log(data);
var datadone =await DataService.createDataSet(data._id, date2);
//console.log("its was made");
    }catch(e){
throw Error("Error while Creating data set Data")
    }
  });



}




_this = this


// Async Controller function to get the To do List

exports.getPhoneNotis = async function(req, res, next) {

  // Check the existence of the query parameters, If the exists doesn't exists assign a default value
  try {

    selectedbeacon = await BeaconService.getBeacons({
      beaconID: req.body.beaconID
    })

    //selectedbeacon = JSON.parse(selectedbeaconstr);
//console.log(selectedbeacon[0]);
    // Return the beacons list with the appropriate HTTP Status Code and Message.

  } catch (e) {

    //Return an Error Response Message with Code and the Error Message.

    return res.status(400).json({
      status: 400,
      message: e.message
    });

  }


try{



  let date4 = new Date(Date.now());

  date4.setHours(0,0,0,0);

  console.log(selectedbeacon[0]);
   await DataService.updateCount(selectedbeacon[0].beacondata, date4)
}catch(e){
  return res.status(400).json({
    status: 400,
    message: e.message
  });
}


  try {


    //console.log(selectedbeacon[0].beacongroupid);

    var possiblenotifications = await NotificationgroupService.getNotigrps({
      beacongroupid: selectedbeacon[0].beacongroupid._id
    })

    // Return the beacons list with the appropriate HTTP Status Code and Message.

    //console.log(possiblenotifications);
  } catch (e) {

    //Return an Error Response Message with Code and the Error Message.

    return res.status(400).json({
      status: 400,
      message: e.message
    });

  }
console.log(possiblenotifications[0].notificationid);
  try {

    var nowDate = new Date(Date.now());
    var results = await NotificationService.getNotis({
      _id: {
        $in: possiblenotifications[0].notificationid
      },
      tagid: {
        $in: req.body.tagid
      },
      active: true,
      startdate: {
        $lte: nowDate
      },
      enddate: {
        $gte: nowDate
      }
    })
    console.log(results);

    if (!req.body.list) {
      var size = results.length;
      var rand = Math.floor(Math.random() * size);
      result = results[rand];
    } else {
      result = results;
    }


    // Return the beacons list with the appropriate HTTP Status Code and Message.
    return res.status(200).json({
      status: 200,
      data: result,
      message: "Succesfully Found Notification"
    });


  } catch (e) {

    //Return an Error Response Message with Code and the Error Message.

    return res.status(400).json({
      status: 400,
      message: e.message
    });

  }




}



exports.didUserClick= async function(req, res, next) {
  try{


    var notidatas=await NotificationService.getNotis({_id: req.body.notiid})
  }catch(e){
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
//console.log(notidatas);

  try{
    let date5 = new Date(Date.now());

    date5.setHours(0,0,0,0);
    //console.log(selectedbeacon[0].beacondata);
     await DataService.updateCount(notidatas[0].notidata, date5)

     return res.status(200).json({
       status: 200,
       message: "Success recorded Hit"
     });
  }catch(e){
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }

}
