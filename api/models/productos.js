const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const schemaProducto = Schema ({
        codigo: String,
        nombre: String,
        descripcion: String,
        tipo: String,
        tamanio: String,
        precio: Number,
        stock: Number,
        borrado: Boolean
      });
      
      
    const productos = mongoose.model("Productos", schemaProducto);
      
      
    
    module.exports = productos