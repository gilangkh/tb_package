const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/package");

const DetailOrder = require("../models/detailOrderModel"); // Import model "DetailOrder" yang telah Anda definisikan

const success = "Data berhasil ditambahkan";
const err = "Data gagal ditambahkan";

const getAllDetailOrder = async (req, res) => {
  try {
    const detailOrders = await DetailOrder.findAll();
    console.log(detailOrders);
    res.status(200).json(detailOrders);
  } catch (error) {
    console.log("getAllDetailOrderError = " + error);
    res.status(500).json({ error: err });
  }
};

const createDetailOrder = async (req, res) => {
  try {
    const {
      order_id,
      produk_id,
      ukuran_id,
      jumlah_pesanan,
    } = req.body;

    const newDetailOrder = await DetailOrder.create({
      order_id,
      produk_id,
      ukuran_id,
      jumlah_pesanan,
    });

    let response = {
      data: newDetailOrder,
      success: success,
    };
    res.status(201).json(response);
    console.log(response);
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("createDetailOrder Error + ", error);
    res.status(500).json(response);
  }
};

const updateDetailOrder = async (req, res) => {
  try {
    const { order_id, produk_id, ukuran_id } = req.params;
    let data = req.body;

    const detailOrder = await DetailOrder.findOne({ where: { order_id, produk_id, ukuran_id } });

    if (!detailOrder) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response);
    } else {
      detailOrder.jumlah_pesanan = data.jumlah_pesanan;
      detailOrder.updated_at = new Date();

      await detailOrder.save();
      let response = {
        success: "Data berhasil diupdate",
        data: detailOrder,
      };
      res.status(200).json(response);
    }
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("updateDetailOrder Error + ", error);
    res.status(500).json(response);
  }
};

const deleteDetailOrder = async (req, res) => {
  try {
    const { order_id, produk_id, ukuran_id } = req.params;

    const detailOrder = await DetailOrder.findOne({ where: { order_id, produk_id, ukuran_id } });

    if (!detailOrder) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response);
    } else {
      await detailOrder.destroy();

      let response = {
        success: "Data berhasil dihapus",
      };
      res.status(200).json(response);
    }
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("deleteDetailOrder Error + ", error);
    res.status(500).json(response);
  }
};

module.exports = { getAllDetailOrder, createDetailOrder, updateDetailOrder, deleteDetailOrder };
