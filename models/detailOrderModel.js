const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/package");

const DetailOrder = sequelize.define(
  "DetailOrder",
  {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Menjadikan order_id sebagai bagian dari primary key
      unique: "compositeKey", // Menetapkan unique constraint
    },
    produk_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Menjadikan produk_id sebagai bagian dari primary key
      unique: "compositeKey", // Menetapkan unique constraint
    },
    ukuran_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Menjadikan ukuran_id sebagai bagian dari primary key
      unique: "compositeKey", // Menetapkan unique constraint
    },
    jumlah_pesanan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
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
