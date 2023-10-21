const Pengiriman= require('./pengirimanModel')
const JenisPengiriman= require('./jenisPengirimanModel')
const DetailPengiriman = require('./detaiL_pengirimanModel')
const Produk = require('./produkModel')
const Ukuran = require('./ukuranModel')
const DetailProduk = require('./detail_produkModel')
Pengiriman.hasMany(DetailPengiriman, {foreignKey: 'pengiriman_id',});

JenisPengiriman.hasMany(DetailPengiriman, {foreignKey: 'jenis_pengiriman_id',});

DetailPengiriman.belongsTo(Pengiriman, {foreignKey: 'pengiriman_id',});

DetailPengiriman.belongsTo(JenisPengiriman, {foreignKey: 'jenis_pengiriman_id',});

Produk.hasMany(DetailProduk,{foreignKey:'produk_id'})
Ukuran.hasMany(DetailProduk,{foreignKey:'ukuran_id'})

DetailProduk.belongsTo(Produk,{foreignKey:'produk_id'})
DetailProduk.belongsTo(Ukuran,{foreignKey:'ukuran_id'})




module.exports = {
  Pengiriman,
  JenisPengiriman,
  DetailPengiriman,
  Ukuran,
  Produk,
  DetailProduk
};





