const Produk = require("../models/produkModel"); // Menggunakan model Produk yang baru

const success = "Data berhasil ditambahkan";
const err = "Data gagal ditambahkan";

const getAllProducts = async (req, res) => {
  try {
    var products = await Produk.findAll();
    console.log(products);
    res.status(200).json(products); 
  } catch (error) {
    console.log("getAllProducts Error = " + error);
    res.status(500).json({ error: err }); 
  }
};

const createProduct = async (req, res) => {
  try {
    const {produk_id, nama_produk, deskripsi, } = req.body;
    const gambar_produk = req.file.filename
    const newProduct = await Produk.create({
      produk_id:produk_id,
      nama_produk: nama_produk,
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
    res.status(500).json({ error: err }); 
  }
};

  const updateProduct = async (req, res) => {
    try {
      const produk_id = req.params.product_id;
      let data = req.body;

      const product = await Produk.findOne({where:{produk_id}});

      if (!product) {
        let response = {
          error: "Data tidak ditemukan",
        };
        res.status(404).json(response); 
      } else {
        product.nama_produk = data.nama_produk;
        product.deskripsi = data.deskripsi;
        product.updated_at = new Date();

        await product.save();
        let response = {
          success: "Data berhasil diupdate",
          data: product,
        };
        res.status(200).json(response); 
      }
    } catch (error) {
      console.log("updateProduct Error + ", error);
      res.status(500).json({ error: "data gagal di update",error }); 
    }
};
const updateProductImg = async (req, res) => {
  try {
    const produk_id = req.params.product_id;
    let data = req.body;

    const product = await Produk.findByPk(produk_id);

    if (!product) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); 
    } else {
      product.gambar_produk = req.file.filename;
      product.updated_at = new Date();

      await product.save();
      let response = {
        success: "gambar berhasil diupdate",
        data: product.gambar_produk,
      };
      console.log(product.gambar_produk)
      res.status(200).json(response); 
    }
  } catch (error) {
    console.log("updateProduct Error + ", error);
    res.status(500).json({ error: err }); 
  }
};

const deleteProduct = async (req, res) => {
  try {
    const produk_id = req.params.product_id;

    const product = await Produk.findByPk(produk_id);

    if (!product) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); 
    } else {
      await product.destroy();

      let response = {
        success: "Data berhasil dihapus",
      };
      res.status(200).json(response); 
    }
  } catch (error) {
    console.log("deleteProduct Error + ", error);
    res.status(500).json({ error: err }); 
  }
};

const getOneProduk = async (req,res) =>{
  try {
    const produk_id= req.params.product_id
    const produk = await Produk.findOne({where:{produk_id}})

    if (!produk) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {

      res.status(200).json(produk);
    }

  } catch (error) {
    console.log("deleteProduct Error + ", error);
    res.status(500).json({ error: err }); 
  }
}
module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct,updateProductImg,getOneProduk };
