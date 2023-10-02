const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/package");

const Pengiriman = sequelize.define(
  "Pengiriman",
  {
    pengiriman_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: "pengiriman",
    timestamps: false, // Tidak perlu mengaktifkan timestamps karena sudah ada created_at dan updated_at.
    createdAt: "created_at",
    updatedAt: "updated_at",
   }
);

module.exports = Pengiriman;
