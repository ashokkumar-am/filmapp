var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/films', function (req, res, next) {
  res.render('films', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/signup', function (req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/create', function (req, res, next) {
  res.render('create', { title: 'Express' });
});
module.exports = router;
