const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/package");

const DetailProduk = sequelize.define(
  "DetailProduk",
  {
    produk_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ukuran_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    harga: {
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
    tableName: "detail_produk",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

DetailProduk.removeAttribute('id'); // Menghapus kolom id yang biasanya ada secara default

module.exports = DetailProduk;
