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
