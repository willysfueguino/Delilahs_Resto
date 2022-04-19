const chalk = require("chalk")
const mongoose = require("mongoose")
//const {Schema, Model} = require("mongoose");
//const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
let environment = process.env.NODE_ENV

let url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

let dbState = [{
  value: 0,
  label: "disconnected"
},
{
  value: 1,
  label: "connected"
},
{
  value: 2,
  label: "connecting"
},
{
  value: 3,
  label: "disconnecting"
}];

if(environment === "cloud"){
  url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@delilahs-cluster.sblbj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
}

let connectDB = async function(){

  try{ 
    //console.log(url)
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res)=> {
      const state = Number(mongoose.connection.readyState);
      console.log(dbState.find(f => f.value == state).label, "to db"); 
    })
  } catch(err){
    console.log("Error conectando DB: " + err)
  }
}

connectDB()
