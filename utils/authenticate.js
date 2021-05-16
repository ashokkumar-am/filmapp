require('dotenv').config();

const jwt = require('jsonwebtoken');
const Response = require('../responses/responses')
const userModel = require('../models/user')

//const services = require("../service");

// authenticate
function authenticate() {
  const methods = {
    verifyToken: async (req,res,next,token) => {
      try {

        let decoded = await jwt.verify(token.trim(), process.env.JWT_SECRET);
        //console.log("decoded--**",decoded);
        
        let userData  = await userModel.findOne({
          _id : decoded.userId
        });

        if(userData){
          return {
            status: true,
            data : userData
          }

        }else{
          return {
            status: false,
            erroType: 'userNotFound'
          }
        }
        
      } catch (err) {
        console.log("err", err);
        if (err.name === 'TokenExpiredError')
          return {
            status: false,
            erroType: 'TokenExpiredError'
          }
        else if (err.name === 'JsonWebTokenError')
          return {
            status: false,
            erroType: 'JsonWebTokenError'
          }
        else
          return {
            status: false,
            erroType: 'Unauthorized'
          }
      }
    }
  };

  // return Object freeze 
  return Object.freeze(methods);
}

// exporting the modules 
module.exports = authenticate();
