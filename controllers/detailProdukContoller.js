const DetailProduk = require("../models/DetailProduk");

const success = "Data berhasil ditambahkan";
const err = "Data gagal ditambahkan";

const getAllDetailProduk = async (req, res) => {
  try {
    const detailProduk = await DetailProduk.findAll();
    res.status(200).json(detailProduk); // Menggunakan status 200 untuk OK
  } catch (error) {
    console.log("getAllDetailProduk Error = " + error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const createDetailProduk = async (req, res) => {
  try {
    const { ukuran_id, produk_id, harga } = req.body;

    const newDetailProduk = await DetailProduk.create({
      ukuran_id: ukuran_id,
      produk_id: produk_id,
      harga: harga,
    });

    let response = {
      data: newDetailProduk,
      success: success,
    };
    res.status(201).json(response); // Menggunakan status 201 untuk Created
    console.log(response);
  } catch (error) {
    console.log("createDetailProduk Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const updateDetailProduk = async (req, res) => {
  try {
    const detail_produk_id = req.params.detail_produk_id;
    let data = req.body;

    const detailProduk = await DetailProduk.findByPk(detail_produk_id);

    if (!detailProduk) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      detailProduk.ukuran_id = data.ukuran_id;
      detailProduk.produk_id = data.produk_id;
      detailProduk.harga = data.harga;
      detailProduk.updated_at = new Date();

      await detailProduk.save();
      let response = {
        success: "Data berhasil diupdate",
        data: detailProduk,
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    console.log("updateDetailProduk Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const deleteDetailProduk = async (req, res) => {
  try {
    const detail_produk_id = req.params.detail_produk_id;

    const detailProduk = await DetailProduk.findByPk(detail_produk_id);

    if (!detailProduk) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      await detailProduk.destroy();

      let response = {
        success: "Data berhasil dihapus",
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    console.log("deleteDetailProduk Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

module.exports = { getAllDetailProduk, createDetailProduk, updateDetailProduk, deleteDetailProduk };
