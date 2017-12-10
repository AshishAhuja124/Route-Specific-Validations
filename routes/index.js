var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form Validation', success: req.session.success, errors: req.session.errors });//session establishment
  req.session.errors = null;//all the errors will be cleared after they are shown to user
});

router.post('/submit', function(req, res, next) {   //check validity
  req.check('email', 'Invalid email address').isEmail();  //isEmail built in validators.We have lots of built in validators
  req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);

  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
  } else {
    req.session.success = true;
  }
  res.redirect('/');
});

module.exports = router;
