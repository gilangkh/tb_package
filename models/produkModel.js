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

const Produk = sequelize.define(
  "Produk", 
  {
    produk_id: {
      type: DataTypes.UUIDV4,
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
