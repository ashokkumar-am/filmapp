var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res,) => {
  res.render('index', { title: 'Filmy Application' });
});

// Filmy View 
router.get('/films', (req, res,) => {
  res.render('films', { title: 'Film Page - Filmy Application' });
});

router.get('/login', (req, res,) => {
  res.render('login', { title: 'Login Page - Filmy Application' });
});

router.get('/signup', (req, res,) => {
  res.render('signup', { title: 'Signup Page - Filmy Application' });
});

router.get('/create', (req, res,) => {
  res.render('create', { title: 'Movie Creating Page - Filmy Application' });
});

module.exports = router;
