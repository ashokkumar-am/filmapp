require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
const mongoose = require("mongoose");
const chalk = require("chalk");
const port = process.env.port;
const mongoDbUrl = process.env.mongoDbUrl;
var app = express();

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
app.use(function (req, res, next) {
  next(createError(404));
});


app.use(require('./middleware/errorHandler'));

mongoose.Promise = global.Promise;
mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
  console.log(
    "%s MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

app.listen(port, () => {
  console.log(
    chalk.green.bold(`Filmy App Server listening at http://localhost:${port}`)
  );
});

module.exports = app;
