const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/package");

const Order = sequelize.define(
  "Order",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    pembayaran_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pengiriman_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jenis_pengiriman_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    desain_produk: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    tanggal_order: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status_order: {
      type: DataTypes.STRING(20),
    },
    tanggal_bayar: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.N
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
    tableName: "order",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Order;
