var express = require('express');
var router = express.Router();

const {login} = require('../controllers/AuthController')

const { getAllUser, createUser, updateUser, deleteUser } = require('../controllers/UserController')
const { getAllOrder, updateOrder, createOrder, deleteOrder } = require('../controllers/orderController')
const { getAllProducts, updateProduct, createProduct, deleteProduct } = require('../controllers/produkController');
const { getAllPengiriman, updatePengiriman, createPengiriman, deletePengiriman } = require('../controllers/pengirimanController');
const { getAllSizes, updateSize, createSize, deleteSize } = require('../controllers/ukuranController');
const { getAllJenisPengiriman, updateJenisPengiriman, createJenisPengiriman, deleteJenisPengiriman } = require('../controllers/jenisPengirimanController');
const { getAllDetailProduk, updateDetailProduk, createDetailProduk, deleteDetailProduk } = require('../controllers/detailProdukController');
const { getAllDetailPengiriman, updateDetailPengiriman, createDetailPengiriman, deleteDetailPengiriman } = require('../controllers/detailPengirimanController');
const { getAllDetailOrder, updateDetailOrder, createDetailOrder, deleteDetailOrder } = require('../controllers/detailOrderController');
const { getAllPayments, createPayment, updatePayment, deletePayment } = require('../controllers/pembayaranController');

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images'); // Direktori penyimpanan gambar
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = new Date().getTime() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage: storage });


router.post('/login', login)

/* GET home page. */

router.get('/user', getAllUser)
router.post('/user/create',upload.single('picture'), createUser)
router.post('/user/:user_id/update',upload.single('picture'), updateUser)
router.post('/user/:user_id/delete', deleteUser)

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

router.get('/jenis_pengiriman', getAllJenisPengiriman);
router.post('/jenis_pengiriman/create', createJenisPengiriman);
router.post('/jenis_pengiriman/:jenis_pengiriman_id/update', updateJenisPengiriman);
router.post('/jenis_pengiriman/:jenis_pengiriman_id/delete', deleteJenisPengiriman);

router.get('/payment', getAllPayments);
router.post('/payment/create', createPayment);
router.post('/payment/:pembayaran_id/update', updatePayment);
router.post('/payment/:pembayaran_id/delete', deletePayment);

module.exports = router;
