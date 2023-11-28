var express = require('express');
var router = express.Router();

const { login } = require('../controllers/AuthController')

const { getAllUser, createUser, updateUser, deleteUser, profileUser, updateProfile, updatePassword } = require('../controllers/UserController')
const { getAllOrder, updateOrder, createOrder, deleteOrder, test, Invoice, getAllOrderHistory } = require('../controllers/orderController')
const { getAllProducts, updateProduct, createProduct, deleteProduct, updateProductImg, getOneProduk } = require('../controllers/produkController');
const { getAllPengiriman, updatePengiriman, createPengiriman, deletePengiriman } = require('../controllers/pengirimanController');
const { getAllSizes, updateSize, createSize, deleteSize } = require('../controllers/ukuranController');
const { getAllJenisPengiriman, updateJenisPengiriman, createJenisPengiriman, deleteJenisPengiriman } = require('../controllers/jenisPengirimanController');
const { getAllDetailProduk, updateDetailProduk, createDetailProduk, deleteDetailProduk, DetailOneProduk, DetailItemProduk, cartProduk } = require('../controllers/detailProdukController');
const { getAllDetailPengiriman, updateDetailPengiriman, createDetailPengiriman, deleteDetailPengiriman, getDistrikPengiriman } = require('../controllers/detailPengirimanController');
const { getAllDetailOrder, updateDetailOrder, createDetailOrder, deleteDetailOrder, getUserLogin, updateUserLogin, getAllDetailOrderDone, getAllDetailOrderInvoice, keranjang, getAllOrderInvoice } = require('../controllers/detailOrderController');
const { getAllPayments, createPayment, updatePayment, deletePayment } = require('../controllers/pembayaranController');
const { authenticateToken, isAdmin } = require('../middleware/authToken')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images'); // Direktori penyimpanan gambar
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = new Date().getTime() + '-' + file.fieldname;
    cb(null, uniqueSuffix);
  },
});
const filter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png'||
    file.mimetype === 'image/jpg'||
    file.mimetype ==='image/jpeg'
     ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filter
});


router.post('/login', login)

router.post('/user/create', upload.single('picture'), createUser)
/* GET home page. */


router.use(authenticateToken)
router.get('/test',test)

router.get('/user', getAllUser)
router.get('/userLogin', getUserLogin)
router.post('/updateUser', updateUserLogin)
router.post('/user/:user_id/update', upload.single('picture'), updateUser)
router.post('/user/:user_id/delete', deleteUser)

router.get('/order', getAllOrder);
router.get('/orderHistory', getAllOrderHistory);
router.get('/invoice/:order_id',Invoice);
router.post('/order/create/:produk_id/:ukuran_id', createOrder);
router.post('/order/update', updateOrder);
router.post('/order/:order_id/delete', deleteOrder);

router.get('/product', getAllProducts);
router.post('/product/create', upload.single("gambar_produk"), createProduct);
router.post('/product/:product_id/update', updateProduct);
router.post('/product/:product_id/updateImg', upload.single("gambar_produk"), updateProductImg);
router.post('/product/:product_id/delete', deleteProduct);
router.get('/product/:product_id', getOneProduk);

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

router.get("/detailPengiriman", getAllDetailPengiriman)
router.get("/distrikPengiriman", getDistrikPengiriman)
router.post("/detailPengiriman/create", createDetailPengiriman)
router.post("/detailPengiriman/:pengiriman/:jenis_pengiriman/update", updateDetailPengiriman)
router.post("/detailPengiriman/:pengiriman/:jenis_pengiriman/delete", deleteDetailPengiriman)

router.get("/detailProduk", getAllDetailProduk)
router.post("/detailProduk/create", createDetailProduk)
router.post("/detailProduk/:produk_id/:ukuran_id/update", updateDetailProduk)
router.post("/detailProduk/:produk_id/:ukuran_id/delete", deleteDetailProduk)
router.get("/detailProduk/:produk_id", DetailOneProduk)
router.get("/detailProduk/:produk_id/:size", DetailItemProduk)

router.get('/order/detail',keranjang)
router.get('/order/detail/invoice',getAllDetailOrderInvoice)
router.get('/order/detail/:order_id',getAllOrderInvoice)
router.post('/order/delete',deleteDetailOrder)


router.get('/profileUser',profileUser)
router.post('/updateProfile',updateProfile)
router.post('/updatePassword',updatePassword)


module.exports = router;



