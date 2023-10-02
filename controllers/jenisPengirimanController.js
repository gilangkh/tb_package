const JenisPengiriman = require("../models/JenisPengiriman");

const success = "Data berhasil ditambahkan";
const err = "Data gagal ditambahkan";

const getAllJenisPengiriman = async (req, res) => {
  try {
    const jenisPengiriman = await JenisPengiriman.findAll();
    res.status(200).json(jenisPengiriman); // Menggunakan status 200 untuk OK
  } catch (error) {
    console.log("getAllJenisPengiriman Error = " + error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const createJenisPengiriman = async (req, res) => {
  try {
    const { jenis } = req.body;

    const newJenisPengiriman = await JenisPengiriman.create({
      jenis: jenis,
    });

    let response = {
      data: newJenisPengiriman,
      success: success,
    };
    res.status(201).json(response); // Menggunakan status 201 untuk Created
    console.log(response);
  } catch (error) {
    console.log("createJenisPengiriman Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const updateJenisPengiriman = async (req, res) => {
  try {
    const jenis_pengiriman_id = req.params.jenis_pengiriman_id;
    let data = req.body;

    const jenisPengiriman = await JenisPengiriman.findByPk(jenis_pengiriman_id);

    if (!jenisPengiriman) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      jenisPengiriman.jenis = data.jenis;
      jenisPengiriman.updated_at = new Date();

      await jenisPengiriman.save();
      let response = {
        success: "Data berhasil diupdate",
        data: jenisPengiriman,
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    console.log("updateJenisPengiriman Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const deleteJenisPengiriman = async (req, res) => {
  try {
    const jenis_pengiriman_id = req.params.jenis_pengiriman_id;

    const jenisPengiriman = await JenisPengiriman.findByPk(jenis_pengiriman_id);

    if (!jenisPengiriman) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      await jenisPengiriman.destroy();

      let response = {
        success: "Data berhasil dihapus",
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    console.log("deleteJenisPengiriman Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

module.exports = { getAllJenisPengiriman, createJenisPengiriman, updateJenisPengiriman, deleteJenisPengiriman };
