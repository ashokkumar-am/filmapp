const responseStatus = require('../configs/httpCodes')
const { codeMsgs } = require("../configs")
// response class 
class Response {
  // triggering a success response 

  success(req, res, status, data = null, message = 'success') {

    return res.status(status).json({
      status,
      message,
      data
    });
  }
  // triggering a error response 
  errors(req, res, status, message, data) {

    return res.status(status).json({
      status,
      message,
      data
    });
  }

  // triggering a error response 
  errorsWithOutReq(status, message) {
    // req.appLogger.error(`Error : ${message}`)
    message = codeMsgs[status] ? codeMsgs[status] : 'Internel server error!'
    return res.status(status).json({
      status,
      message
    });
  }
  // triggering a joi error response  
  joierrors(req, res, err) {

    let error = err.details.reduce((prev, curr) => {
      prev[curr.path[0]] = curr.message.replace(/"/g, '');
      return prev;
    }, {});
    let message = "Bad Request";

    let status = responseStatus.HTTP_BAD_REQUEST;

    return res.status(status).json({
      status,
      message,
      error
    });
  }
  joicustomerrors(req, res, err) {

    let error = err.details.reduce((prev, curr) => {
      // prev[curr.path[0]] = curr.message.replace(/"/g, '');
      return curr.message.replace(/"/g, '');
    }, {});
    let message = error //messageTypes.joiValidation.badRequest;
    let status = status.HTTP_BAD_REQUEST;

    return res.status(status).json({
      status,
      message,
      error
    });
  }

}

// exporting the module 
module.exports = new Response();
