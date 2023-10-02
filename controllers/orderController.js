const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root@localhost/package");
const bcrypt = require("bcrypt");

const Order = require("../models/orderModel"); // Import model "Order" yang telah Anda definisikan

const success = "Data berhasil ditambahkan";
const err = "Data gagal ditambahkan";

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.findAll();
    console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    console.log("getAllOrderError = " + error);
    res.status(500).json({ error: err });
  }
};

const createOrder = async (req, res) => {
  try {
    const {
      pembayaran_id,
      user_id,
      pengiriman_id,
      jenis_pengiriman_id,
      desain_produk,
      tanggal_order,
      status_order,
      tanggal_bayar,
    } = req.body;

    const newOrder = await Order.create({
      pembayaran_id,
      user_id,
      pengiriman_id,
      jenis_pengiriman_id,
      desain_produk,
      tanggal_order,
      status_order,
      tanggal_bayar,
    });

    let response = {
      data: newOrder,
      success: success,
    };
    res.status(201).json(response);
    console.log(response);
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("createOrder Error + ", error);
    res.status(500).json(response);
  }
};

const updateOrder = async (req, res) => {
  try {
    const order_id = req.params.order_id;
    let data = req.body;

    const order = await Order.findOne({ where: { order_id: order_id } });

    if (!order) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response);
    } else {
      order.pembayaran_id = data.pembayaran_id;
      order.user_id = data.user_id;
      order.pengiriman_id = data.pengiriman_id;
      order.jenis_pengiriman_id = data.jenis_pengiriman_id;
      order.desain_produk = data.desain_produk;
      order.tanggal_order = data.tanggal_order;
      order.status_order = data.status_order;
      order.tanggal_bayar = data.tanggal_bayar;
      order.updated_at = new Date();

      await order.save();
      let response = {
        success: "Data berhasil diupdate",
        data: order,
      };
      res.status(200).json(response);
    }
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("updateOrder Error + ", error);
    res.status(500).json(response);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order_id = req.params.order_id;

    const order = await Order.findOne({ where: { order_id: order_id } });

    if (!order) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response);
    } else {
      await order.destroy();

      let response = {
        success: "Data berhasil dihapus",
      };
      res.status(200).json(response);
    }
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("deleteOrder Error + ", error);
    res.status(500).json(response);
  }
};

module.exports = { getAllOrder, createOrder, updateOrder, deleteOrder };
