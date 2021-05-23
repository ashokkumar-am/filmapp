require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var helmet = require('helmet')
var cors = require('cors')

var cookieParser = require("cookie-parser");
var logger = require("morgan");


var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
const mongoose = require("mongoose");
const chalk = require("chalk");
const path = require("path");

const mongoDbUrl = process.env.mongoDbUrl;
var app = express();
app.use(cors());
app.use(helmet());
app.use(logger("common"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });


app.use(require('./middleware/errorHandler'));

function connect() {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on("error", (err) => {
      console.log("MongoDB connection error "
      );
      process.exit();
    });
  })
}

function close() {
  return mongoose.disconnect();
}




module.exports = app;
