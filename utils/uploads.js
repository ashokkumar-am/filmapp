var multer = require("multer");
var path = require('path')

// for index page carousel
var fileUpload = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../public/uploads");
  },
  filename: function (req, file, cb) {
    console.log("file.mimetype",file.mimetype);
    cb(null, "img" + "-" + Date.now() + path.extname(file.originalname));
  },
});

module.exports = {
  fileUpload: multer({
    storage: fileUpload,
  }),
};
