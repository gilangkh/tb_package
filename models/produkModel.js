const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/package");

const Produk = sequelize.define(
  "Produk", 
  {
    produk_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    nama_produk: {
      type: DataTypes.STRING, 
      allowNull: false,
    },   
    gambar_produk: {
      type: DataTypes.STRING, 
    },
    deskripsi: {
      type: DataTypes.STRING, 
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
    tableName: "produk", 
    timestamps: true, 
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Produk;
