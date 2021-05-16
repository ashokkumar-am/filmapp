var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('Home Page Crawling...')
  res.render('index', { title: 'Filmy App' });
  next();
});

router.get('/films', function (req, res, next) {
  res.render('films', { title: 'Filmy App' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Filmy App' });
});
router.get('/signup', function (req, res, next) {
  res.render('register', { title: 'Filmy App' });
});

router.get('/create', function (req, res, next) {
  res.render('create', { title: 'Filmy App' });
});

// app.use('/verify', function (req, res, next) {
//   console.log("Authenticate and Redirect")
//   res.redirect('/user');
//   next();
// });

// app.get('/user', function (req, res) {
//   res.send("User Page");
// });
module.exports = router;
