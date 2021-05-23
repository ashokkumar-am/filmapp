var express = require("express");
var router = express.Router();
var cors = require('cors')
const Joi = require('joi');
const _ = require('lodash');
const { addMovie, signUp, addComment, loginUser } = require('../validator/api.validator')
const Response = require("../responses/responses");
const { messages, status } = require("../configs");
const { fileUpload } = require('../utils/uploads')
const movieModel = require('../models/movie')
const movieCommentsModel = require('../models/movieComments')
const userModel = require('../models/user')
const { generateHash } = new userModel()
const authMethods = require('../utils/authMethods')
const verifyToken = require('../hooks/verifyToken')
// router.use(cors());
// var allowlist = ['http://3.108.14.110/']
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }
/* Add movie*/
router.post("/v1/movie/add", fileUpload.single('fileKey'), async (req, res, next) => {
  try {

    if (req.file) {
      req.body.moviePhoto = req.file.filename
    }

    var insertMovie = await movieModel.create(req.body)

    return Response.success(req, res, status.HTTP_OK, insertMovie, "Movie created successfully")
  }
  catch (error) {
    next({ status: status.HTTP_INTERNAL_SERVER_ERROR, message: JSON.stringify({ message: error.message, stack: error.stack }) });
  }
});

/* User Signup */
router.post("/v1/user/signup", signUp, async (req, res, next) => {
  try {

    let checkUser = await userModel.findOne({
      email: req.body.email
    })

    if (checkUser) {
      return Response.errors(req, res, status.HTTP_BAD_REQUEST, "User already exist")
    }

    req.body.password = generateHash(req.body.password)

    var insertUser = await userModel.create(req.body)

    return Response.success(req, res, status.HTTP_OK, insertUser, "User signup successfully")
  }
  catch (error) {
    next({ status: status.HTTP_INTERNAL_SERVER_ERROR, message: JSON.stringify({ message: error.message, stack: error.stack }) });
  }
});

/* Login Page */
router.post("/v1/user/login", loginUser, async (req, res, next) => {
  try {
    let checkUser = await userModel.findOne({
      email: req.body.email
    })

    if (!checkUser) {
      return Response.errors(req, res, status.HTTP_BAD_REQUEST, "User not found")
    }

    let checkPassword = checkUser.validatePassword(req.body.password)
    if (!checkPassword) {
      return Response.errors(req, res, status.HTTP_UNAUTHORIZED, "Password wrong")
    }

    let generateToken = await authMethods.generateToken({
      userId: checkUser._id
    })

    var result = {
      _id: checkUser._id,
      email: checkUser.email,
      token: generateToken
    }

    // console.log("checkPassword", checkPassword);
    return Response.success(req, res, status.HTTP_OK, result, "User login successfully")
  }
  catch (error) {
    next({ status: status.HTTP_INTERNAL_SERVER_ERROR, message: JSON.stringify({ message: error.message, stack: error.stack }) });
  }
});

/* Movie List All */
router.get("/v1/movie/list", async (req, res, next) => {
  try {
    let listMovies = await movieModel.find({
      status: 1
    }).lean()

    // console.log("listMovies", listMovies);
    return Response.success(req, res, status.HTTP_OK, listMovies, "Movie listed successfully")
  }
  catch (error) {
    console.log("error", error);
    next({ status: status.HTTP_INTERNAL_SERVER_ERROR, message: JSON.stringify({ message: error.message, stack: error.stack }) });
  }
});

/* Add movie slug added */
router.get("/v1/movie/list/:movieSlug", async (req, res, next) => {
  try {
    let listMovies = await movieModel.findOne({
      movieSlug: req.params.movieSlug,
      status: 1
    })
      .populate([{
        path: 'comments',
        populate: {
          path: 'userId',
          select: ('_id', 'name', 'email')
        }
      }])

    // console.log("listMovies", listMovies);
    return Response.success(req, res, status.HTTP_OK, listMovies, "Movie listed successfully")
  }
  catch (error) {
    console.log("error", error);
    next({ status: status.HTTP_INTERNAL_SERVER_ERROR, message: JSON.stringify({ message: error.message, stack: error.stack }) });
  }
});
/* Comment Section */
router.post("/v1/movie/add/comment", verifyToken, addComment, async (req, res, next) => {
  try {
    // console.log("req.user", req.user);
    var userId = req.user._id
    var addComment = await movieCommentsModel.create({
      comment: req.body.comment,
      userId: userId
    })

    await movieModel.updateOne({
      _id: req.body.movieId
    },
      {
        $push: {
          comments: addComment._id
        }
      })

    return Response.success(req, res, status.HTTP_OK, null, "Comment added successfully")
  }
  catch (error) {
    next({ status: status.HTTP_INTERNAL_SERVER_ERROR, message: JSON.stringify({ message: error.message, stack: error.stack }) });
  }
});

module.exports = router;
