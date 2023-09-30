const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/package");

const Ukuran = sequelize.define(
  "Ukuran", // Nama model
  {
    // Definisi kolom-kolom pada tabel "ukuran"
    ukuran_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // Menambahkan auto increment untuk primary key
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
    tableName: "ukuran", // Nama tabel di database
    timestamps: false, // Tidak menggunakan timestamps bawaan Sequelize
    createdAt: "created_at",
    updatedAt: "updated_at",
}
);

module.exports = Ukuran;
