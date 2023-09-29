/** @format */

const { where } = require("sequelize");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const success = "Data berhasil ditambahkan";
const err = "data gagal ditambahkan";
const getAllUser = async (req, res) => {
  try {
    var users = await User.findAll();
    console.log(users);
    res.json(users);
  } catch (error) {
    console.log("getAllUserError = " + error);
  }
};

const createUser = async (req, res) => {
  try {
    const {nama,email,password,telp,alamat,picture} = req.body
   

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const newUser = await User.create({
      nama: nama,
      email: email,
      password: hashedPassword,
      telp: telp,
      alamat: alamat,
      picture: picture,
    });

    let response = {
      data: newUser,
      success: success,
    };
    res.json(response);
    console.log(response);
  } catch (error) {
    let response = {
      error: err,
    };
    console.log("createUser Error + ", error);
    res.json(response);
  }
};

const updateUser = async(req,res)=>{
    try {
        const user_id=req.params.user_id
        let 
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = User.findOne({where:{user_id:user_id}})

        if (!user) {
          let response={
            error:"data tidak di temukan"
          }
          res.json(response)
        } else {
          

          asd
        }

        
    } catch (error) {
        
    }
}
module.exports = { getAllUser, createUser,updateUser };
