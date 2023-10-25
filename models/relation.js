const Pengiriman = require('./pengirimanModel')
const JenisPengiriman = require('./jenisPengirimanModel')
const DetailPengiriman = require('./detaiL_pengirimanModel')
const Produk = require('./produkModel')
const Ukuran = require('./ukuranModel')
const DetailProduk = require('./detail_produkModel')
const Pembayaran = require('./pembayaranModel')
const Order = require('./orderModel')
const DetailOrder = require('./detailOrderModel')
const User = require('./userModel')

Pengiriman.hasMany(DetailPengiriman, {
  foreignKey: { name: 'pengiriman_id', primaryKey: true },
  sourceKey: 'pengiriman_id',
});
JenisPengiriman.hasMany(DetailPengiriman, {
  foreignKey: { name: 'jenis_pengiriman_id', primaryKey: true },
  sourceKey: 'jenis_pengiriman_id',
});
DetailPengiriman.belongsTo(Pengiriman, {
  foreignKey: { name: 'pengiriman_id', primaryKey: true },
  sourceKey: 'pengiriman_id',
});
DetailPengiriman.belongsTo(JenisPengiriman, {
  foreignKey: { name: 'jenis_pengiriman_id', primaryKey: true },
  sourceKey: 'jenis_pengiriman_id',
});

Produk.hasMany(DetailProduk, { foreignKey: 'produk_id' })
Ukuran.hasMany(DetailProduk, { foreignKey: 'ukuran_id' })
DetailProduk.belongsTo(Produk, { foreignKey: 'produk_id' })
DetailProduk.belongsTo(Ukuran, { foreignKey: 'ukuran_id' })

User.hasMany(Order, { foreignKey: 'user_id' })
Order.belongsTo(User, { foreignKey: 'user_id' })

Pembayaran.hasMany(Order, { foreignKey: 'pembayaran_id' });
Order.belongsTo(Pembayaran, { foreignKey: 'pembayaran_id' })

DetailPengiriman.hasMany(Order, {
  foreignKey: {
    name: 'pengiriman_id',
    primaryKey: true,
  },
  sourceKey: 'pengiriman_id',
});

DetailPengiriman.hasMany(Order, {
  foreignKey: {
    name: 'jenis_pengiriman_id',
    primaryKey: true,
  },
  sourceKey: 'jenis_pengiriman_id',
});

Order.belongsTo(DetailPengiriman, {
  foreignKey: {
    name: 'pengiriman_id',
    primaryKey: true,
  },
  targetKey: 'pengiriman_id',
});

Order.belongsTo(DetailPengiriman, {
  foreignKey: {
    name: 'jenis_pengiriman_id',
    primaryKey: true,
  },
  targetKey: 'jenis_pengiriman_id',
});


Order.hasMany(DetailOrder, { foreignKey: 'order_id' });
DetailOrder.belongsTo(Order, { foreignKey: 'order_id' });
DetailProduk.hasMany(DetailOrder, {
  foreignKey: { name: 'produk_id', primaryKey: true },
  sourceKey: 'produk_id',
});
DetailProduk.hasMany(DetailOrder, {
  foreignKey: { name: 'ukuran_id', primaryKey: true },
  sourceKey: 'ukuran_id',
});
DetailOrder.belongsTo(DetailProduk, {
  foreignKey: { name: 'produk_id', primaryKey: true },
  targetKey: 'produk_id',
});
DetailOrder.belongsTo(DetailProduk, {
  foreignKey: { name: 'ukuran_id', primaryKey: true },
  targetKey: 'ukuran_id',
});

module.exports = {
  Pengiriman,
  JenisPengiriman,
  DetailPengiriman,
  Ukuran,
  Produk,
  DetailProduk,
  Pembayaran,
  Order,
  DetailOrder,
  User
};





