const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'package',
});

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
    id_paket:{
      type:DataTypes.INTEGER,
      allowNull:false,
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

DetailProduk.removeAttribute('id'); 

module.exports = DetailProduk;
