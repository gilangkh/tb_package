const Produk = require("../models/produkModel"); // Menggunakan model Produk yang baru

const success = "Data berhasil ditambahkan";
const err = "Data gagal ditambahkan";

const getAllProducts = async (req, res) => {
  try {
    var products = await Produk.findAll();
    console.log(products);
    res.status(200).json(products); // Menggunakan status 200 untuk OK
  } catch (error) {
    console.log("getAllProducts Error = " + error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const createProduct = async (req, res) => {
  try {
    const { nama_produk, harga, deskripsi, gambar_produk, } = req.body;

    const newProduct = await Produk.create({
      nama_produk: nama_produk,
      harga: harga,
      deskripsi: deskripsi,
      gambar_produk: gambar_produk,
    });

    let response = {
      data: newProduct,
      success: success,
    };
    res.status(201).json(response); // Menggunakan status 201 untuk Created
    console.log(response);
  } catch (error) {
    console.log("createProduct Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const updateProduct = async (req, res) => {
  try {
    const produk_id = req.params.produk_id;
    let data = req.body;

    const product = await Produk.findByPk(produk_id); // Menggunakan findByPk untuk mencari berdasarkan primary key

    if (!product) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      product.nama_produk = data.nama_produk;
      product.harga = data.harga;
      product.deskripsi = data.deskripsi;
      product.gambar_produk = data.gambar_produk;
      product.updated_at = new Date();

      await product.save();
      let response = {
        success: "Data berhasil diupdate",
        data: product,
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    console.log("updateProduct Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

const deleteProduct = async (req, res) => {
  try {
    const produk_id = req.params.produk_id;

    const product = await Produk.findByPk(produk_id); // Menggunakan findByPk untuk mencari berdasarkan primary key

    if (!product) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      await product.destroy();

      let response = {
        success: "Data berhasil dihapus",
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    console.log("deleteProduct Error + ", error);
    res.status(500).json({ error: err }); // Menggunakan status 500 untuk Internal Server Error
  }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };
