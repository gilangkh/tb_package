const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/package");

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
