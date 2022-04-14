const chalk = require("chalk")
const mongoose = require("mongoose")
//const {Schema, Model} = require("mongoose");
//const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;


let connectDB = async function(){

  try{ 
    
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res)=> {
    console.log('Conectado a la base de datos')   
    })
  } catch(err){
    console.log("Error conectando DB: " + err)
  }
}

connectDB()



