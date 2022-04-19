var express = require('express');
var router = express.Router();

var UsersControllerRead = require('../src/controllers/users/read.userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  UsersControllerRead.service(req, res)
});

module.exports = router;
