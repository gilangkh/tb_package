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
    biaya_pengiriman: {
      type: DataTypes.INTEGER,
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
