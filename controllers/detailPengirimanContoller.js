const DetailPengiriman = require("../models/DetailPengiriman");

const success = "Data berhasil ditambahkan";
const err = "Data gagal ditambahkan";

const getAllDetailPengiriman = async (req, res) => {
  try {
    const detailPengiriman = await DetailPengiriman.findAll();
    res.status(200).json(detailPengiriman); // Menggunakan status 200 untuk OK
  } catch (error) {
    console.log("getAllDetailPengiriman Error = " + error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const createDetailPengiriman = async (req, res) => {
  try {
    const { pengiriman_id, jenis_pengiriman_id, biaya_pengiriman } = req.body;

    const newDetailPengiriman = await DetailPengiriman.create({
      pengiriman_id: pengiriman_id,
      jenis_pengiriman_id: jenis_pengiriman_id,
      biaya_pengiriman: biaya_pengiriman,
    });

    let response = {
      data: newDetailPengiriman,
      success: success,
    };
    res.status(201).json(response); // Menggunakan status 201 untuk Created
    console.log(response);
  } catch (error) {
    console.log("createDetailPengiriman Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const updateDetailPengiriman = async (req, res) => {
  try {
    const detail_pengiriman_id = req.params.detail_pengiriman_id;
    let data = req.body;

    const detailPengiriman = await DetailPengiriman.findByPk(detail_pengiriman_id);

    if (!detailPengiriman) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      detailPengiriman.pengiriman_id = data.pengiriman_id;
      detailPengiriman.jenis_pengiriman_id = data.jenis_pengiriman_id;
      detailPengiriman.biaya_pengiriman = data.biaya_pengiriman;
      detailPengiriman.updated_at = new Date();

      await detailPengiriman.save();
      let response = {
        success: "Data berhasil diupdate",
        data: detailPengiriman,
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    console.log("updateDetailPengiriman Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const deleteDetailPengiriman = async (req, res) => {
  try {
    const detail_pengiriman_id = req.params.detail_pengiriman_id;

    const detailPengiriman = await DetailPengiriman.findByPk(detail_pengiriman_id);

    if (!detailPengiriman) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      await detailPengiriman.destroy();

      let response = {
        success: "Data berhasil dihapus",
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    console.log("deleteDetailPengiriman Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

module.exports = { getAllDetailPengiriman, createDetailPengiriman, updateDetailPengiriman, deleteDetailPengiriman };
