//const bcryptjs = require('bcryptjs');
const usuarios = require("../models/usuarios");

exports.list = async function (req,res){
  let todos = await usuarios.find()
  res.status(200).json(todos)
};

//Chequeo mail duplicado

exports.createUsuario = async function (req, res) {
  
  try {
      const nAccount = new usuarios({ 
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        nacimiento: req.body.nacimiento,
        email: req.body.email,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        pais: req.body.pais,
        pass: req.body.pass,
      });
      
      await nAccount.save()
      
      res.status(201).json("Cuenta creada exitosamente");
      
      
  } catch (error) {
    console.log(error.message)
    res.status(400).json("Datos incorrectos o faltantes.")
  }

  
}

