const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const schemaUsuario = Schema ({
    nombre: {type: String, required: true, unique: false},
    apellido: {type: String, required: true, unique: false},
    nacimiento: {type: Date, required: false, unique: false},
    email: {type: String, required: true, unique: true},
    pais: {type: String, required: false, unique: false},
    pass: {type: String, required: false, unique: false},
    direccion: {type: String, required: false, unique: false},
    telefono: {type: String, required: false, unique: false},
    auth0Id: {type: String, required: false, unique: false},
    nombreAuth0: {type: String, required: false, unique: false},
    apellidoAuth0: {type: String, required: false, unique: false},
    isAdmin: {type: Boolean, required: false, unique: false, default: "false"},
    borrado: {type: Boolean, required: false, unique: false, default: "false"},
    token: {type: String, required: false, unique: false, default: ""},
  });
  
const usuarios = mongoose.model("usuarios", schemaUsuario);

module.exports = usuarios