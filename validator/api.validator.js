const Joi = require('joi');
const _ = require('lodash');
const { messages, status, StatusCodes } = require("../configs");
const Response = require('../responses/responses')

// add Joi schema 
const schemas = {
  addMovie: Joi.object().keys({
    name: Joi.string().label('name').required(),
    description: Joi.string().label('description').required(),
    releaseDate: Joi.date().label('releaseDate').required(),
    rating : Joi.number().label('rating').required(),
    ticketPrice : Joi.number().label('ticketPrice').required(),
    country : Joi.string().label('country').required(),
    genre : Joi.array().label('genre').required(),
  }),
  addComment: Joi.object().keys({
    comment: Joi.string().label('comment').required(),
    movieId: Joi.string().label('movieId').required()
  }),
  signUp: Joi.object().keys({
    name: Joi.string().label('name').required(),
    email: Joi.string().email().label('description').required(),
    password: Joi.string().label('password').required()
  }),
  loginUser: Joi.object().keys({
    email: Joi.string().email().label('description').required(),
    password: Joi.string().label('password').required()
  })
};

const options = {
  // generic option
  basic: {
    abortEarly: false,
    convert: true,
    allowUnknown: false,
    stripUnknown: true
  },
  // Options for Array of array
  array: {
    abortEarly: false,
    convert: true,
    allowUnknown: true,
    stripUnknown: {
      objects: true
    }
  }
};

module.exports = {
  // exports validate admin signin 
  addMovie: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.addMovie;
    let option = options.basic;

    // validating the schema 
    var { error, value } = schema.validate(req.body, option);
    if(!_.isEmpty(value)){
      next()
    }
    if(!_.isEmpty(error)){
      // returning the response 
      Response.joierrors(req, res, error)
    }
  },
  addComment: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.addComment;
    let option = options.basic;

    // validating the schema 
    var { error, value } = schema.validate(req.body, option);
    if(!_.isEmpty(value)){
      next()
    }
    if(!_.isEmpty(error)){
      // returning the response 
      Response.joierrors(req, res, error)
    }
  },
  signUp: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.signUp;
    let option = options.basic;

    // validating the schema 
    var { error, value } = schema.validate(req.body, option);
    if(!_.isEmpty(value)){
      next()
    }
    if(!_.isEmpty(error)){
      // returning the response 
      Response.joierrors(req, res, error)
    }
  },
  loginUser: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.loginUser;
    let option = options.basic;

    // validating the schema 
    var { error, value } = schema.validate(req.body, option);
    if(!_.isEmpty(value)){
      next()
    }
    if(!_.isEmpty(error)){
      // returning the response 
      Response.joierrors(req, res, error)
    }
  }
}
