exports.error = function(error, deliverable, res) {
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error
    });
  } else {
    return res.status(200).json({
      status: 200,
      data: deliverable,
      message: ""
    });
  }

};


exports.errortrue = function(error, deliverable, res) {
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error
    });
  } else {
    return res.json({
      status: true,
      data: deliverable,
      message: ""
    });
  }

};



exports.errorreturn = function(error, deliverable) {
  if (error) {
    return error;
  } else {
    return deliverable;
  }

};

exports.errorconsole = function(error, deliverable) {
  if (error) {
     console.log(error);
  } else {
     console.log(deliverable);
  }

};
