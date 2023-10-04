var express = require('express');
var router = express.Router();
const path = require('path')
const link = path.join(__dirname,'../public/pages/')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/index', function(req, res, next) {
  res.sendFile(link+"login.html")
});




module.exports = router;
