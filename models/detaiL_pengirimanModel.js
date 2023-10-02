const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/package");

const DetailPengiriman = sequelize.define(
  "DetailPengiriman",
  {
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
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
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
