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

const Pembayaran = sequelize.define(
  "Pembayaran", // Nama model
  {
    // Definisi kolom-kolom pada tabel "pembayaran"
    pembayaran_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    metode: {
      type: DataTypes.STRING(20), // Menggunakan panjang maksimal 20 karakter
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
    tableName: "pembayaran", // Nama tabel di database
    timestamps: true, // Tidak menggunakan timestamps bawaan Sequelize
    createdAt: "created_at",
    updatedAt: "updated_at",
}
);

module.exports = Pembayaran;
