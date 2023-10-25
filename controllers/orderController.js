

const { DetailOrder, Order, DetailPengiriman, User } = require("../models/relation");
const Pengiriman = require("../models/pengirimanModel")
const Pembayaran = require("../models/pembayaranModel")
// const Order = require("../models/relation")
const success = "Data berhasil ditambahkan";
const err = "Internal Server Error";

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.findAll();
    console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    console.log("getAllOrderError = " + error);
    res.status(500).json({ error: err });
  }
};

const createOrder = async (req, res) => {
  try {
    const {
      desain_produk,
      jumlah_pesanan
    } = req.body;
    const user_id = req.user.user_id
    const existOrder = await Order.findOne({
      where: {
        status_order: "menunggu",
        user_id: req.user.user_id
      }
    })
    if (!existOrder) {
      const newOrder = await Order.create({
        user_id: user_id,
        pembayaran_id: 1,
        pengiriman_id: 5,
        jenis_pengiriman_id: 7,
        desain_produk,
        tanggal_order: "menunggu",
        status_order: "menunggu",
      });
      const newDetailOrder = await DetailOrder.create({
        order_id: newOrder.order_id,
        produk_id: req.params.produk_id,
        ukuran_id: req.params.ukuran_id,
        jumlah_pesanan

      })
      let response = {
        order: newOrder,
        detailOrder: newDetailOrder,
        success: success,
      };
      res.status(201).json(response);
      console.log(response);
    } else {
      const newDetailOrder = await DetailOrder.create({
        order_id: existOrder.order_id,
        produk_id: req.params.produk_id,
        ukuran_id: req.params.ukuran_id,
        jumlah_pesanan

      })
      let response = {
        detailOrder: newDetailOrder,
        success: success,
      };
      res.status(201).json(response);
      console.log(response);
    }
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("createOrder Error + ", error);
    res.status(500).json(response);
  }
};

const updateOrder = async (req, res) => {
  try {

    let data = req.body;

    const order = await Order.findOne({
      where: {
        status_order: "menunggu",
        user_id: req.user.user_id
      }
    });

    if (!order) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response);
    } else {
      order.pembayaran_id = data.pembayaran_id
      order.pengiriman_id = data.pengiriman_id;
      order.jenis_pengiriman_id = 3
      order.tanggal_order = new Date()
      order.status_order = "selesai"
      order.tanggal_bayar = new Date();
      order.updated_at = new Date();

      await order.save();
      let response = {
        success: "Data berhasil diupdate",
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
  const user_id = req.user.user_id
  console.log(user_id)
  try {
    const order = await Order.findOne({ where: { user_id: req.user.user_id } });
    res.status(201).json(order)
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("deleteOrder Error + ", error);
    res.status(500).json(response);
  }
}

const Invoice = async (req, res) => {
  try {
    const order_id = req.params.order_id

    const order = await Order.findOne({
      where: { order_id: order_id },
      include: [
        {
          model: DetailPengiriman,
          attributes: ["biaya_pengiriman"],
          include: [{
            model: Pengiriman,
            attributes: ['nama']
          }]
        },
        {
          model: Pembayaran,
          attributes: ['metode'],
        },
        {
          model: User,
          attributes: ["alamat"]
        }
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
}

const getAllOrderHistory = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{
        model:User,
        where:{user_id:req.user.user_id}
      },{
        model:DetailPengiriman,
        attributes:['biaya_pengiriman']
      }],
      
      where: { status_order: "selesai" },
      group: ['order_id'],
    });

    console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    console.log("getAllOrderError = " + error);
    res.status(500).json({ error: err });
  }
};


module.exports = { getAllOrderHistory, Invoice, getAllOrder, createOrder, updateOrder, deleteOrder, test };
