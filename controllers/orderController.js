/** @format */

const {
  DetailOrder,
  Order,
  DetailPengiriman,
  User,
  DetailProduk,
} = require("../models/relation");
const Pengiriman = require("../models/pengirimanModel");
const Pembayaran = require("../models/pembayaranModel");
const Paket = require("../models/paketModel");
// const Order = require("../models/relation")
const success = "Data berhasil ditambahkan";
const err = "Internal Server Error";

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where:{status_order:"selesai"},
      include:[{
        model:User
      }]
    });
    console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    console.log("getAllOrderError = " + error);
    res.status(500).json({ error: err });
  }
};

const createOrder = async (req, res) => {
  try {
    const {  id_paket } = req.body;
    const { ukuran_id, produk_id } = req.params;
    const user_id = req.user.user_id;

  
    let pembayaran_id = 7;
    let pengiriman_id = 9;
    let jenis_pengiriman_id = 8;

    const user = await User.findOne({where:{user_id:req.user.user_id}})
    if(!user){
      return res.status(404).json({error:"user belum login" +user + req.user.user_id})
    }
    const produk = await DetailProduk.findOne({
      where: {
        produk_id,
        ukuran_id,
        id_paket,
      },
    });

    if (!produk) {
      return res.status(400).json({ error: "Produk belum ditambahkan" });
    }

    const paket = await Paket.findOne({ where: { id_paket } });
    if (!paket) {
      return res.status(400).json({ error: "Tidak ada paket" });
    }

    const pengiriman = await DetailPengiriman.findOne({
      where: { pengiriman_id, jenis_pengiriman_id },
    });
    if (!pengiriman) {
      return res.status(400).json({ error: "Tidak ada pengiriman" });
    }

    let harga = produk.harga * paket.nama_paket;

    const existOrder = await Order.findOne({
      where: {
        status_order: "menunggu",
        user_id: req.user.user_id,
      },
    });

    if (!existOrder) {
      const newOrder = await Order.create({
        user_id,
        pembayaran_id,
        pengiriman_id,
        jenis_pengiriman_id,
        desain_produk:user.picture,
        biaya_pengiriman: pengiriman.biaya_pengiriman,
        tanggal_order: "menunggu",
        status_order: "menunggu",
      });

      const newDetailOrder = await DetailOrder.create({
        order_id: newOrder.order_id,
        produk_id,
        ukuran_id,
        id_paket,
        jumlah_pesanan: paket.nama_paket,
        harga_pembayaran: harga,
      });

      let response = {
        order: newOrder,
        detailOrder: newDetailOrder,
        success: "Produk telah ditambhakan ke keranjang",
      };

      res.status(201).json(response);
      console.log(response);
    } else {
      const existingDetailOrder = await DetailOrder.findOne({
        where: {
          order_id: existOrder.order_id,
          produk_id,
          ukuran_id,
          id_paket,
        },
      });

      if (existingDetailOrder) {
        return res.status(400).json({ error: "Data sudah ditambahkan" });
      }

      const newDetailOrder = await DetailOrder.create({
        order_id: existOrder.order_id,
        produk_id,
        ukuran_id,
        id_paket,
        jumlah_pesanan: paket.nama_paket,
        harga_pembayaran: harga,
      });

      let response = {
        detailOrder: newDetailOrder,
        success: "Produk telah ditambhakan ke keranjang", // Assuming success is a string
      };

      res.status(201).json(response);
      console.log(response);
    }
  } catch (error) {
    let response = {
      error,
    };
    console.error("createOrder Error: ", error);
    res.status(500).json(response);
  }
};


const updateOrder = async (req, res) => {
  try {
    let data = req.body;

    const order = await Order.findOne({
      where: {
        status_order: "menunggu",
        user_id: req.user.user_id,
      },
    });

    if (!order) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response);
    } else {
      order.pembayaran_id = data.pembayaran_id;
      order.pengiriman_id = data.pengiriman_id;
      order.jenis_pengiriman_id = 3;
      order.tanggal_order = new Date();
      order.status_order = "selesai";
      order.tanggal_bayar = new Date();
      order.updated_at = new Date();

      await order.save();
      let response = {
        success: "order di check out",
        data: order,
      };
      res.status(200).json(response);
    }
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("updateOrder Error + ", error);
    res.status(500).json(response);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order_id = req.params.order_id;

    const order = await Order.findOne({ where: { order_id: order_id } });

    if (!order) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response);
    } else {
      await order.destroy();

      let response = {
        success: "Data berhasil dihapus",
      };
      res.status(200).json(response);
    }
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("deleteOrder Error + ", error);
    res.status(500).json(response);
  }
};

const test = async (req, res) => {
  const user_id = req.user.user_id;
  console.log(user_id);
  try {
    const order = await Order.findOne({ where: { user_id: req.user.user_id } });
    res.status(201).json(order);
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("deleteOrder Error + ", error);
    res.status(500).json(response);
  }
};

const Invoice = async (req, res) => {
  try {
    const order_id = req.params.order_id;

    const order = await Order.findOne({
      where: { order_id: order_id },
      include: [
        {
          model: DetailPengiriman,
          attributes: ["biaya_pengiriman"],
          include: [
            {
              model: Pengiriman,
              attributes: ["nama"],
            },
          ],
        },
        {
          model: Pembayaran,
          attributes: ["metode"],
        },
        {
          model: User,
          attributes: ["alamat"],
        },
      ],
    });

    if (!order) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response);
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    console.log("deleteOrder Error + ", error);
    res.status(500).json(response);
  }
};

const getAllOrderHistory = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          where: { user_id: req.user.user_id },
        },
        {
          model: DetailPengiriman,
          attributes: ["biaya_pengiriman"],
        },
      ],

      where: { status_order: "selesai" },
    });

    console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    console.log("getAllOrderError = " + error);
    res.status(500).json({ error: err });
  }
};



module.exports = {
  getAllOrderHistory,
  Invoice,
  getAllOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  test,

};
