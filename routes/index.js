var express = require('express');
var router = express.Router();


var UsersControllerRegister = require('../src/controllers/users/register.userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', UsersControllerRegister.validation, function(req, res, next) {
  UsersControllerRegister.service(req, res)
});

module.exports = router;
