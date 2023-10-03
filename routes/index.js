var express = require('express');
var router = express.Router();
const {getAllUser,createUser,updateUser,deleteUser} = require('../controllers/UserController')
const {getAllOrder,updateOrder,createOrder,deleteOrder} =require('../controllers/orderController')
const { getAllProducts, updateProduct, createProduct, deleteProduct } = require('../controllers/produkController');
const { getAllPengiriman, updatePengiriman, createPengiriman, deletePengiriman } = require('../controllers/pengirimanController');
const { getAllSizes, updateSize, createSize, deleteSize } = require('../controllers/ukuranController');
const { getAllJenisPengiriman, updateJenisPengiriman, createJenisPengiriman, deleteJenisPengiriman } = require('../controllers/jenisPengirimanController');
const { getAllDetailProduk, updateDetailProduk, createDetailProduk, deleteDetailProduk } = require('../controllers/detailProdukController');
const { getAllDetailPengiriman, updateDetailPengiriman, createDetailPengiriman, deleteDetailPengiriman } = require('../controllers/detailPengirimanController');
const { getAllDetailOrder, updateDetailOrder, createDetailOrder, deleteDetailOrder } = require('../controllers/detailOrderController');
const { getAllPayments, createPayment, updatePayment, deletePayment } = require('../controllers/pembayaranController');

/* GET home page. */

router.get('/user',getAllUser)
router.post('/user/create',createUser)
router.post('/user/:user_id/update',updateUser)
router.post('/user/:user_id/delete',deleteUser)

router.get('/order', getAllOrder);
router.post('/order/create', createOrder);
router.post('/order/:order_id/update', updateOrder);
router.post('/order/:order_id/delete', deleteOrder);

router.get('/product', getAllProducts);
router.post('/product/create', createProduct);
router.post('/product/:product_id/update', updateProduct);
router.post('/product/:product_id/delete', deleteProduct);

router.get('/pengiriman', getAllPengiriman);
router.post('/pengiriman/create', createPengiriman);
router.post('/pengiriman/:pengiriman_id/update', updatePengiriman);
router.post('/pengiriman/:pengiriman_id/delete', deletePengiriman);

router.get('/size', getAllSizes);
router.post('/size/create', createSize);
router.post('/size/:size_id/update', updateSize);
router.post('/size/:size_id/delete', deleteSize);

router.get('/jenis-pengiriman', getAllJenisPengiriman);
router.post('/jenis-pengiriman/create', createJenisPengiriman);
router.post('/jenis-pengiriman/:jenis_pengiriman_id/update', updateJenisPengiriman);
router.post('/jenis-pengiriman/:jenis_pengiriman_id/delete', deleteJenisPengiriman);

router.get('/payment', getAllPayments);
router.post('/payment/create', createPayment);
router.post('/payment/:pembayaran_id/update', updatePayment);
router.post('/payment/:pembayaran_id/delete', deletePayment);
 
module.exports = router;
