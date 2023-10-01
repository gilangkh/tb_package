const Order = require("../models/orderModel");

const success = "Data berhasil ditambahkan";
const err = "Data gagal ditambahkan";

const getAllOrders = async (req, res) => {
  try {
    var orders = await Order.findAll();
    console.log(orders);
    res.status(200).json(orders); // Menggunakan status 200 untuk OK
  } catch (error) {
    console.log("getAllOrders Error = " + error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const createOrder = async (req, res) => {
  try {
    const { pembayaran_id, user_id, tanggal_order, status_order, tanggal_bayar, ukuran } = req.body;

    const newOrder = await Order.create({
      pembayaran_id: pembayaran_id,
      user_id: user_id,
      tanggal_order: tanggal_order,
      status_order: status_order,
      tanggal_bayar: tanggal_bayar,
      ukuran: ukuran,
    });

    let response = {
      data: newOrder,
      success: success,
    };
    res.status(201).json(response); // Menggunakan status 201 untuk Created
    console.log(response);
  } catch (error) {
    console.log("createOrder Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const updateOrder = async (req, res) => {
  try {
    const order_id = req.params.order_id;
    let data = req.body;

    const order = await Order.findByPk(order_id);

    if (!order) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      order.pembayaran_id = data.pembayaran_id;
      order.user_id = data.user_id;
      order.tanggal_order = data.tanggal_order;
      order.status_order = data.status_order;
      order.tanggal_bayar = data.tanggal_bayar;
      order.ukuran = data.ukuran;
      order.updated_at = new Date();

      await order.save();
      let response = {
        success: "Data berhasil diupdate",
        data: order,
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    console.log("updateOrder Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order_id = req.params.order_id;

    const order = await Order.findByPk(order_id);

    if (!order) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      await order.destroy();

      let response = {
        success: "Data berhasil dihapus",
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    console.log("deleteOrder Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

module.exports = { getAllOrders, createOrder, updateOrder, deleteOrder };
