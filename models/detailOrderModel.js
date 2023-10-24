const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/package");

const DetailOrder = sequelize.define(
  "DetailOrder",
  {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Menjadikan order_id sebagai bagian dari primary key

    },
    produk_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Menjadikan produk_id sebagai bagian dari primary key
    },
    ukuran_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Menjadikan ukuran_id sebagai bagian dari primary key
    },
    jumlah_pesanan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW
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
