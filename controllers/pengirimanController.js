const Pengiriman = require("../models/pengirimanModel");

const success = "Data berhasil ditambahkan";
const err = "Data gagal ditambahkan";

const getAllPengiriman = async (req, res) => {
  try {
    var pengiriman = await Pengiriman.findAll();
    console.log(pengiriman);
    res.status(200).json(pengiriman); // Menggunakan status 200 untuk OK
  } catch (error) {
    console.log("getAllPengiriman Error = " + error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const createPengiriman = async (req, res) => {
  try {
    const { nama } = req.body;

    const newPengiriman = await Pengiriman.create({
      nama,
    });

    let response = {
      data: newPengiriman,
      success: success,
    };
    res.status(201).json(response); // Menggunakan status 201 untuk Created
    console.log(response);
  } catch (error) {
    console.log("createPengiriman Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const updatePengiriman = async (req, res) => {
  try {
    const pengiriman_id = req.params.pengiriman_id;
    let data = req.body;

    const pengiriman = await Pengiriman.findByPk(pengiriman_id);

    if (!pengiriman) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      pengiriman.nama = data.nama;
      pengiriman.updated_at = new Date();

      await pengiriman.save();
      let response = {
        success: "Data berhasil diupdate",
        data: pengiriman,
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    console.log("updatePengiriman Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const deletePengiriman = async (req, res) => {
  try {
    const pengiriman_id = req.params.pengiriman_id;

    const pengiriman = await Pengiriman.findByPk(pengiriman_id);

    if (!pengiriman) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      await pengiriman.destroy();

      let response = {
        success: "Data berhasil dihapus",
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    console.log("deletePengiriman Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

module.exports = { getAllPengiriman, createPengiriman, updatePengiriman, deletePengiriman };
