
const {  DetailOrder, } = require("../models/relation"); 
const  User= require('../models/userModel')
const Order= require("../models/orderModel")// Import model "DetailOrder" yang telah Anda definisikan
const { DetailProduk, Produk, Ukuran, } = require("../models/relation");
const { Sequelize } = require("sequelize");

const success = "Data berhasil ditambahkan";
const err = "Internal Server Error";

  const getAllDetailOrder = async (req, res) => {
    try {

      const detailOrders = await DetailOrder.findAll({
        include:[{
          model: DetailProduk,
          include:[{
            model:Produk,
            attributes:["nama_produk",'gambar_produk','deskripsi']
          },{
            model:Ukuran,
            attributes:['ukuran']
          }]
        },{
          model:Order,
          where:{status_order:"menunggu"},
          include:[{
            model:User,
            where:{user_id:req.user.user_id}
          }]
        }]
      });
      console.log(detailOrders);
      res.status(200).json(detailOrders);
    } catch (error) {
      console.log("getAllDetailOrderError = " + error);
      res.status(500).json({ error: err });
    }
};
  const getAllDetailOrderDone = async (req, res) => {
    try {
      const order_id = req.params.order_id
      const detailOrders = await DetailOrder.findAll({
        include:[{
          model: DetailProduk,
          attributes:['harga'],
          include:[{
            model:Produk,
            attributes:["nama_produk",'gambar_produk','deskripsi']
          },{
            model:Ukuran,
            attributes:['ukuran']
          }]
        },{
          model:Order,
          where:{status_order:"selesai",order_id:order_id},
          include:[{
            model:User,
            where:{user_id:req.user.user_id}
          }]
        }]
      });
      console.log(detailOrders);
      res.status(200).json(detailOrders);
    } catch (error) {
      console.log("getAllDetailOrderError = " + error);
      res.status(500).json({ error: err });
    }
};
const getAllDetailOrderInvoice = async (req, res) => {
  try {
    const order_id = req.params.order_id
    const detailOrders = await DetailOrder.findAll({
      include:[{
        model: DetailProduk,
        include:[{
          model:Produk,
          attributes:["nama_produk",'gambar_produk','deskripsi']
        },{
          model:Ukuran,
          attributes:['ukuran']
        }]
      },{
        model:Order,
        where:{status_order:"selesai"},
        include:[{
          model:User,
          where:{user_id:req.user.user_id}
        }]
      }]
    });
    console.log(detailOrders);
    res.status(200).json(detailOrders);
  } catch (error) {
    console.log("getAllDetailOrderError = " + error);
    res.status(500).json({ error: err });
  }
};
const createDetailOrder = async (req, res) => {
  try {
    const {
      order_id,
      produk_id,
      ukuran_id,
      jumlah_pesanan,
    } = req.body;

    const newDetailOrder = await DetailOrder.create({
      order_id,
      produk_id,
      ukuran_id,
      jumlah_pesanan,
    });

    let response = {
      data: newDetailOrder,
      success: success,
    };
    res.status(201).json(response);
    console.log(response);
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("createDetailOrder Error + ", error);
    res.status(500).json(response);
  }
};

const updateDetailOrder = async (req, res) => {
  try {
    const { order_id, produk_id, ukuran_id } = req.params;
    let data = req.body;

    const detailOrder = await DetailOrder.findOne({ where: { order_id, produk_id, ukuran_id } });

    if (!detailOrder) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response);
    } else {
      detailOrder.jumlah_pesanan = data.jumlah_pesanan;
      detailOrder.updated_at = new Date();

      await detailOrder.save();
      let response = {
        success: "Data berhasil diupdate",
        data: detailOrder,
      };
      res.status(200).json(response);
    }
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("updateDetailOrder Error + ", error);
    res.status(500).json(response);
  }
};

const deleteDetailOrder = async (req, res) => {
try {
  const order_id = req.body.order_id
  const produk_id = req.body.produk_id
  const ukuran_id = req.body.ukuran_id
  const detailOrder = await DetailOrder.findOne({ where: { order_id:order_id, produk_id:produk_id,   ukuran_id    :ukuran_id } });
  if(!detailOrder){
    console.log("oke")
    res.json({gagal:"data tidak ditemukan"})
  }else{
    await detailOrder.destroy();
    let response = {
      success: "Data berhasil dihapus",
    
    };
    res.status(200).json(response);
  }
  
  console.log(detailOrder)
} catch (error) {
  
}
 
};

const getUserLogin = async (req,res)=>{

  try {
    const user_id = req.user.user_id
    const user =await User.findOne({where:{user_id:user_id}})

    if(!user){
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response);
    }else{
  
      res.status(201).json(user);
    }
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("deleteDetailOrder Error + ", error);
    res.status(500).json(response);
  }

}
const updateUserLogin = async (req,res)=>{

  try {
    const user_id = req.user.user_id
    const alamat = req.body.alamat
    const user =await User.findOne({where:{user_id:user_id}})

    if(!user){
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response);
    }else{
      user.alamat = alamat

      await user.save();
      let response = {
        success: "Alamat berhasil diupdate",
        data: user,
      };
      res.status(200).json(response);
    }
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("deleteDetailOrder Error + ", error);
    res.status(500).json(response);
  }

}
const keranjang = async (req, res) => {
  try {

    const detailOrders = await DetailOrder.findAll({
      include: [

        {
          model: Order,
          where: { status_order: "menunggu" },
          include: [
            {
              model: User,
              where: { user_id: req.user.user_id }
            }
          ]
        }
      ],
    });

    
    
    
    
    console.log(detailOrders);
    res.status(200).json(detailOrders);
  } catch (error) {
    console.log("getAllDetailOrderError = " + error);
    res.status(500).json({ error: err });
  }
};

const getAllOrderInvoice = async (req, res) => {
  try {
    const order_id = req.params.order_id
    const detailOrders = await DetailOrder.findAll({
      include:[{
        model:Order,
        where:{status_order:"selesai",order_id:order_id},
        include:[{
          model:User,
          where:{user_id:req.user.user_id}
        }]
      }]
    });
    console.log(detailOrders);
    res.status(200).json(detailOrders);
  } catch (error) {
    console.log("getAllDetailOrderError = " + error);
    res.status(500).json({ error: err });
  }
};


module.exports = {getAllOrderInvoice,keranjang,getAllDetailOrderInvoice,getAllDetailOrderDone,updateUserLogin,getUserLogin, getAllDetailOrder, createDetailOrder, updateDetailOrder, deleteDetailOrder };
