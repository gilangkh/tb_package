const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const argon2 = require('argon2')

const success = "Data berhasil ditambahkan";
const err = "Data gagal ditambahkan";

const getAllUser = async (req, res) => {
  try {
    var users = await User.findAll();
    console.log(users);
    res.status(200).json(users); // Menggunakan status 200 untuk OK
  } catch (error) {
    console.log("getAllUserError = " + error);
  }
};

const createUser = async (req, res) => {
  try {
    const { nama, email, password, status,telp, alamat,  } = req.body;
    const picture = req.file.filename
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword);

    const newUser = await User.create({
      nama,email,password: password,status,telp,alamat,picture:picture,
    });

    let response = {
      data: newUser,
      success: success,
    };
    res.status(201).json(response); // Menggunakan status 201 untuk Created
    console.log(response);
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("createUser Error + ", error);
    res.status(500).json(response); // Menggunakan status 500 untuk Internal Server Error
  }
};

const updateUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    let data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 10); // Menyimpan password yang sudah di-hash

    const user = await User.findOne({ where: { user_id: user_id } });

    if (!user) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      user.nama = data.nama;
      user.email = data.email;
      user.password = hashedPassword; // Menggunakan hashedPassword yang sudah di-hash
      user.alamat = data.alamat;
      user.updated_at= new Date();
      user.picture = req.file.filename  
      await user.save();
      let response = {
        success: "Data berhasil diupdate",
        data: user,
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("updateUser Error + ", error);
    res.status(500).json(response); // Menggunakan status 500 untuk Internal Server Error
  }
};

const deleteUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const user = await User.findOne({ where: { user_id: user_id } });

    if (!user) {
      let response = {
        error: "Data tidak ditemukan",
      };
      res.status(404).json(response); // Menggunakan status 404 untuk Not Found
    } else {
      await user.destroy();

      let response = {
        success: "Data berhasil dihapus",
      };
      res.status(200).json(response); // Menggunakan status 200 untuk OK
    }
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("deleteUser Error + ", error);
    res.status(500).json(response); // Menggunakan status 500 untuk Internal Server Error
  }
};
//https://docs.google.com/document/d/1kb6nUP83WG7QOerfNksHncvmE1lwP7tIdnwwG0W3kAA/edit?pli=1
module.exports = { getAllUser, createUser, updateUser, deleteUser };
