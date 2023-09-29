var express = require('express');
var router = express.Router();
const {getAllUser,createUser} = require('../controllers/UserController')

/* GET home page. */

router.get('/user',getAllUser)
router.post('/user/create',createUser)



module.exports = router;
