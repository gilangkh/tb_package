const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'root',
  database: process.env.DB_DATABASE || 'package',
});



const DetailPengiriman = sequelize.define(
  "DetailPengiriman",
  {
    pengiriman_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true
    },
    jenis_pengiriman_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true
    },
    biaya_pengiriman: {
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
    tableName: "detail_pengiriman",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = DetailPengiriman;
