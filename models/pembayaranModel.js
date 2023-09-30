const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/package");

const Pembayaran = sequelize.define(
  "Pembayaran", // Nama model
  {
    // Definisi kolom-kolom pada tabel "pembayaran"
    pembayaran_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    metode: {
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
    tableName: "pembayaran", // Nama tabel di database
    timestamps: false, // Tidak menggunakan timestamps bawaan Sequelize
    createdAt: "created_at",
    updatedAt: "updated_at",
}
);

module.exports = Pembayaran;
