const Ukuran = require("../models/ukuranModel");

const success = "Data berhasil ditambahkan";
const err = "Data gagal ditambahkan";

const getAllSizes = async (req, res) => {
  try {
    var sizes = await Ukuran.findAll();
    console.log(sizes);
    res.status(200).json(sizes); // Menggunakan status 200 untuk OK
  } catch (error) {
    console.log("getAllSizes Error = " + error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const createSize = async (req, res) => {
  try {
    const { ukuran } = req.body;

    const newSize = await Ukuran.create({
      ukuran: ukuran,
    });

    let response = {
      data: newSize,
      success: success,
    };
    res.status(201).json(response); // Menggunakan status 201 untuk Created
    console.log(response);
  } catch (error) {
    console.log("createSize Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const updateSize = async (req, res) => {
  try {
    const ukuran_id = req.params.size_id;
    let data = req.body;

    const size = await Ukuran.findByPk(ukuran_id);

    if (!size) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      size.ukuran = data.ukuran;
      size.updated_at = new Date();

      await size.save();
      let response = {
        success: "Data berhasil diupdate",
        data: size,
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    console.log("updateSize Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const deleteSize = async (req, res) => {
  try {
    const ukuran_id = req.params.size_id;

    const size = await Ukuran.findByPk(ukuran_id);

    if (!size) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      await size.destroy();

      let response = {
        success: "Data berhasil dihapus",
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    console.log("deleteSize Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

module.exports = { getAllSizes, createSize, updateSize, deleteSize };
