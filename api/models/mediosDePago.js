const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const schemaMediosPago = Schema ({
        codigo: String, 
        descripcion: String,
        borrado: {type: Boolean, required: false, unique: false, default: "false"},

      });

      
const MediosDePago = mongoose.model("MediosDePago", schemaMediosPago);
        
module.exports = MediosDePago