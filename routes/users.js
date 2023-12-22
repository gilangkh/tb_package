var express = require('express');
var router = express.Router();
const path = require('path')

const link = path.join(__dirname,'../public/pages/')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', (req, res, next)=> {
  res.sendFile(link+"login.html")
});
router.get('/profile', (req, res, next)=> {
  res.sendFile(link+"profile.html")
});

router.get('/register',(req,res)=>{
  res.sendFile(link+'register.html')
})

router.get('/produk',(req,res)=>{
  res.sendFile(link+'produk.html')
})

router.get('/pembayaran',(req,res)=>{
  res.sendFile(link+'pembayaran.html')
})
router.get('/delivery',(req,res)=>{
  res.sendFile(link+'pengiriman.html')
})
router.get('/home',(req,res)=>{
  res.sendFile(link+'home.html')
})
router.get('/transaksi',(req,res)=>{
  res.sendFile(link+'transaksi.html')
})
router.get('/barang',(req,res)=>{
  res.sendFile(link+'barang.html')
})
router.get('/barang/:produk_id',(req,res)=>{
  res.sendFile(link+'detailBarang.html')
})
router.get('/keranjang',(req,res)=>{
  res.sendFile(link+'keranjang.html')
})
router.get('/shipping',(req,res)=>{
  res.sendFile(link+'shipping.html')
})
router.get('/ukuran',(req,res)=>{
  res.sendFile(link+'ukuran.html')
})
router.get('/deliver/detail',(req,res)=>{
  res.sendFile(link+'detailPengiriman.html')
})
router.get('/pembayaran',(req,res)=>{
  res.sendFile(link+'pembayaran.html')
})
router.get('/bukti',(req,res)=>{
  res.sendFile(link+'bukti.html')
})
router.get('/produk/detail',(req,res)=>{
  res.sendFile(link+'detailProduk.html')
})
router.get('/profile',(req,res)=>{
  res.sendFile(link+'profile.html')
})
router.get('/userWinda',(req,res)=>{
  res.sendFile(link+'user.html')
})
router.get('/paketIndex',(req,res)=>{
  res.sendFile(link+'paket.html')
})

module.exports = router;
