/** @format */

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
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
0;
const createUser = async (req, res) => {
  try {
    const { nama, email, password, telp, alamat,status } = req.body;
    const picture = req.file.filename;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const newUser = await User.create({
      nama,
      email,
      password: hashedPassword,
      status,
      telp,
      alamat,
      picture: picture,
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
      user.updated_at = new Date();
      user.picture = req.file.filename;
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

const profileUser = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const user = await User.findOne({ where: { user_id } });

    if (!user) {
      res.status(404).json({ fail: "tidak ada user login" });
    } else {
      res.status(201).json(user);
    }
  } catch (error) {}
};

const updateProfile = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    let data = req.body;
    const user = await User.findOne({ where: { user_id } });

    if (!user) {
      res.status(404).json({ fail: "tidak ada user login" });
    } else {
      user.nama = data.username;
      user.alamat = data.alamat;
      user.telp = data.telp;

      await user.save();
      let response = {
        success: "Data berhasil diupdate",
        data: user,
      };
      res.status(200).json(response);
    }
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("deleteUser Error + ", error);
    res.status(500).json(response);
  }
};

const updatePassword = async (req,res) =>{
  try {
    const user_id = req.user.user_id;
    let data = req.body;
    const user = await User.findOne({ where: { user_id } });
    const hashedPassword = await bcrypt.hash(data.password,10)
    if (!user) {
      res.status(404).json({ fail: "tidak ada user login" });
    } else {

      const matchPassword = await bcrypt.compare(data.passwordLama, user.password)

      if(!matchPassword){
        return res.status(403).json({error:"password salah"})
      }
      if(data.password != data.passwordBaru){
        return res.status(403).json({error:"password baru yang dimasukkan tidak cocok"})
      }


      user.password = hashedPassword;

      await user.save();
      let response = {
        success: "Data berhasil diupdate",
        data: user,
      };
      res.status(200).json(response);
    }
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("deleteUser Error + ", error);
    res.status(500).json(response);
  }
}

const adminUpdatePassword = async(req,res)=>{
  
    try {
      let password = req.body.password
      let hashedPassword = await bcrypt.hash(password,10)
      const {user_id} = req.params

      const user = await User.findOne({where:{user_id}})

      if(!user){
       return  res.status(404).json({error:"user tidak terdaftar"})
      }

      user.password = hashedPassword
      await user.save()

      let response ={
        data:user,
        success:`password ${user.nama} telah di ubah`
      }
      res.status(201).json(response)
    } catch (error) {
      console.log(error)
      res.status(500).json({error: error.message})
    }
} 

module.exports = {
  updatePassword,
  updateProfile,
  profileUser,
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  adminUpdatePassword
};
