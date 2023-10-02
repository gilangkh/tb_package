const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/package");

const Produk = sequelize.define(
  "Produk", 
  {
    produk_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nama_produk: {
      type: DataTypes.STRING, 
      allowNull: false,
    },  
    harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    gambar_produk: {
      type: DataTypes.STRING, 
    },
    created_at:{
        type:DataTypes.DATE,
        allowNull:false
    },
    updated_at:{
        type:DataTypes.DATE,
        allowNull:false
    }
  },
  {
    tableName: "produk", 
    timestamps: false, 
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Produk;
