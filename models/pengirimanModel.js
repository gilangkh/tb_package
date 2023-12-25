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

const Pengiriman = sequelize.define(
  "Pengiriman",
  {
    pengiriman_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement:true, 
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "pengiriman",
    timestamps: true, // Tidak perlu mengaktifkan timestamps karena sudah ada created_at dan updated_at.
    createdAt: "created_at",
    updatedAt: "updated_at",
   }
);

module.exports = Pengiriman;
