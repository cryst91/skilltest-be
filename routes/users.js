var express = require('express');
var router = express.Router();

const { checkToken  } = require("../src/middlewares/jwt");

var UsersControllerRead = require('../src/controllers/users/read.userController')

/* GET users listing. */
router.get('/', function(req, res, next) {checkToken(req, res, next)}, function(req, res, next) {
  UsersControllerRead.service(req, res)
});



module.exports = router;
