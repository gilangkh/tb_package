const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/package");

const DetailOrder = sequelize.define(
  "DetailOrder",
  {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    produk_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    ukuran_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_paket: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlah_pesanan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    harga_pembayaran: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    tableName: "detail_order",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = DetailOrder;
