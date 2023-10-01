const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/package");

const Order = sequelize.define(
  "Order", // Nama model
  {
    // Definisi kolom-kolom pada tabel "order"
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // Menambahkan auto increment untuk primary key
    },
    pembayaran_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Pembayaran', // Nama model yang di-referensikan
        key: 'pembayaran_id' // Kolom yang di-referensikan
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // Nama model yang di-referensikan
        key: 'user_id' // Kolom yang di-referensikan
      }
    },
    tanggal_order: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status_order: {
      type: DataTypes.STRING(20), // Menggunakan panjang maksimal 20 karakter
      allowNull: false,
    },
    tanggal_bayar: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ukuran: {
      type: DataTypes.STRING(20), // Menggunakan panjang maksimal 20 karakter
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Menetapkan nilai awal ke saat ini
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), // Menetapkan nilai awal ke saat ini dan memperbarui nilai setiap kali data diubah
    },
  },
  {
    tableName: "order", // Nama tabel di database
    timestamps: false, // Tidak menggunakan timestamps bawaan Sequelize
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Order;
