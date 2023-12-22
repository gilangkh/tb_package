const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/package");

const Paket = sequelize.define(
  "Paket", 
  {
    id_paket: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nama_paket: {
      type: DataTypes.STRING, 
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
    tableName: "paket", 
    timestamps: true, 
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Paket;
