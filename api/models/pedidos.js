const mongoose = require("mongoose")
const productos = require("../models/productos")
const { Schema } = require("mongoose")

let d = new Date();
let curr_date = d.getDate();
let curr_month = d.getMonth();
curr_month++;
let curr_year = d.getFullYear();
let curr_hour = d.getHours()
if (curr_hour.length === 1){ curr_hour = "0" + curr_hour }
let curr_mins = d.getMinutes()
if (curr_mins.length === 1){ curr_mins = "0" + curr_mins }
d = (curr_date + "/" + curr_month + "/" + curr_year + " " + curr_hour + ":" + curr_mins);


// Estados: Denotan PENdiente, CONfirmado, EN Preparación, ENViado, ENTregado
let pedidosEstado = ['PEN', 'CON', 'ENP', 'ENV', 'ENT'];

const schemaPedido = Schema ({
        email: {type: String, required: true}, 
        productos: {
        codProducto: { type: String, required: true},
        nombre: { type: String, required: false},
        cantidad: { type: Number, required: true},},
        fecha: { type: String, required: false, default: d},
        direccion: String,
        formaPago: { type:String, required: true},
        estado: String,
        total: Number 
      });

      
const pedidos = mongoose.model("Pedidos", schemaPedido);
        
module.exports = pedidos 