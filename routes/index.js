var express = require('express');
var router = express.Router();
const {getAllUser,createUser,updateUser,deleteUser} = require('../controllers/UserController')
const {getAllOrder,updateOrder,createOrder,deleteOrder} =require('../controllers/orderController')

/* GET home page. */

router.get('/user',getAllUser)
router.post('/user/create',createUser)



module.exports = router;
