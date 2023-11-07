const { DetailProduk, Produk, Ukuran, } = require("../models/relation");

const success = "Data berhasil ditambahkan";
const err = "Data gagal ditambahkan";

const getAllDetailProduk = async (req, res) => {
  try {
    const detailProduk = await DetailProduk.findAll({
      include: [{
        model: Produk,
        attributes: ['nama_produk', 'gambar_produk', 'deskripsi']
      }, {
        model: Ukuran,
        attributes: ['ukuran']
      }]
    });
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
    const produk = req.params.produk_id;
    const ukuran = req.params.ukuran_id;
    let data = req.body;

    const detailProduk = await DetailProduk.findOne({
      where: {
        produk_id: produk,
        ukuran_id: ukuran
      }
    });
    console.log(detailProduk)
    if (!detailProduk) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
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
    res.status(500).json({ error: "internal server error" }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const deleteDetailProduk = async (req, res) => {
  try {
    const produk = req.params.produk_id;
    const ukuran = req.params.ukuran_id;
    let data = req.body;

    const detailProduk = await DetailProduk.findOne({
      where: {
        produk_id: produk,
        ukuran_id: ukuran
      }
    });
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

const DetailOneProduk = async (req, res) => {
  try {
    const produk = req.params.produk_id;

    const detailProduk = await DetailProduk.findAll({
      where: {
        produk_id: produk,
      },
        include: [{
          model: Produk,
          attributes: ['nama_produk', 'gambar_produk', 'deskripsi']
        }, {
          model: Ukuran,
          attributes: ['ukuran']
        }]
      }
    );
    if (!detailProduk) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {

      res.status(200).json(detailProduk);
    }
  } catch (error) {
    console.log("deleteDetailProduk Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error

  }
}



const DetailItemProduk = async (req, res) => {
  try {
    const produk = req.params.produk_id;
    const size = req.params.size;

    const detailProduk = await DetailProduk.findOne({
      where: {
        produk_id: produk,
        ukuran_id: size,
      },
        include: [{
          model: Produk,
          attributes: ['nama_produk', 'gambar_produk', 'deskripsi']
        }, {
          model: Ukuran,
          attributes: ['ukuran']
        }]
      }
    );
    if (!detailProduk) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {

      res.status(200).json(detailProduk);
    }
  } catch (error) {
    console.log("deleteDetailProduk Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error

  }
}

module.exports = { getAllDetailProduk, createDetailProduk, updateDetailProduk, deleteDetailProduk,DetailOneProduk ,DetailItemProduk};
