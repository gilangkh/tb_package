const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/package");

const JenisPengiriman = sequelize.define(
  "JenisPengiriman",
  {
    jenis_pengiriman_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    jenis: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.TIMESTAMP,
    },
    updated_at: {
      type: DataTypes.TIMESTAMP,
    },
  },
  {
    tableName: "jenis_pengiriman",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = JenisPengiriman;
