const { DetailPengiriman, Pengiriman, JenisPengiriman } = require("../models/relation");

const success = "Data berhasil ditambahkan";
const err = "Data gagal ditambahkan";

const getAllDetailPengiriman = async (req, res) => {
  try {
    const detailPengiriman = await DetailPengiriman.findAll({
      include: [
        {
          model: Pengiriman,
          attributes: ["nama"]
        }, {
          model: JenisPengiriman,
          attributes: ["jenis"]
        }]
    });
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
    const pengiriman = req.params.pengiriman;
    const jenis_pengiriman = req.params.jenis_pengiriman;
    const data = req.body;

    const detailPengiriman = await DetailPengiriman.findOne({
      where: {
        pengiriman_id: pengiriman,
        jenis_pengiriman_id: jenis_pengiriman
      }
    });

    if (!detailPengiriman) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Status 404 for Not Found
    } else {
      detailPengiriman.biaya_pengiriman = data.biaya_pengiriman;
      detailPengiriman.updated_at = new Date();

      await detailPengiriman.save();

      let response = {
        success: "Data berhasil diupdate",
        data: detailPengiriman,
      };
      res.status(200).json(response); // Status 200 for OK
    }
  } catch (error) {
    console.log("updateDetailPengiriman Error: ", error);
    res.status(500).json({ error: error }); // Status 500 for Internal Server Error
  }
};


const deleteDetailPengiriman = async (req, res) => {
  try {
    const pengiriman = req.params.pengiriman;
    const jenis_pengiriman = req.params.jenis_pengiriman;
    
    const detailPengiriman = await DetailPengiriman.findOne({
      where: {
        pengiriman_id: pengiriman,
        jenis_pengiriman_id: jenis_pengiriman
      }
    });
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
