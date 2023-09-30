const Pembayaran = require("../models/pembayaranModel");

const success = "Data berhasil ditambahkan";
const err = "Data gagal ditambahkan";

const getAllPayments = async (req, res) => {
  try {
    var payments = await Pembayaran.findAll();
    console.log(payments);
    res.status(200).json(payments); // Menggunakan status 200 untuk OK
  } catch (error) {
    console.log("getAllPayments Error = " + error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const createPayment = async (req, res) => {
  try {
    const { metode } = req.body;

    const newPayment = await Pembayaran.create({
      metode: metode,
    });

    let response = {
      data: newPayment,
      success: success,
    };
    res.status(201).json(response); // Menggunakan status 201 untuk Created
    console.log(response);
  } catch (error) {
    console.log("createPayment Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const updatePayment = async (req, res) => {
  try {
    const pembayaran_id = req.params.pembayaran_id;
    let data = req.body;

    const payment = await Pembayaran.findByPk(pembayaran_id);

    if (!payment) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      payment.metode = data.metode;
      payment.updated_at = new Date();

      await payment.save();
      let response = {
        success: "Data berhasil diupdate",
        data: payment,
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    console.log("updatePayment Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const deletePayment = async (req, res) => {
  try {
    const pembayaran_id = req.params.pembayaran_id;

    const payment = await Pembayaran.findByPk(pembayaran_id);

    if (!payment) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      await payment.destroy();

      let response = {
        success: "Data berhasil dihapus",
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    console.log("deletePayment Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

module.exports = { getAllPayments, createPayment, updatePayment, deletePayment };
