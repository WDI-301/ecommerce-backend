var express = require('express');
var router = express.Router();
var userController = require('./controller/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login-test', function(req, res, next){
  res.status(200).json({
    message: 'Success!!!!'
  })
})

router.post('/login', userController.login)

module.exports = router;
