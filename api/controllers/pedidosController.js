const pedidos = require("../models/pedidos")
const productos = require("../models/productos")
const usuarios = require("../models/usuarios")
const jwt = require("jsonwebtoken")


exports.listarPedidos = async function(req, res, next) {
  let email = req.body.email
  let emailHeaders = req.headers.email
  let emailCorrecto = ""
  //console.log(req.headers.authorization)
  if (email === undefined) {
    emailCorrecto = emailHeaders
  } 
  else if(emailHeaders === undefined) {
    emailCorrecto = email
  }
  else if(email === undefined && emailHeaders === undefined){
    //console.log('Estoy en el if')
    await userAuthenticated(req)
    //console.log("userData: "+ userData.email)
    emailCorrecto = userData
    // console.log("email?" + emailCorrecto)
    next()
  }else {
    
    return res.status(403).json("Error de credencial de usuarios")
  }
  if(!emailCorrecto) {
     res.status(403).json("Email incorrecto.")
  }


  let verificarMail = await usuarios.findOne({ $and: [{ email: {$eq: emailCorrecto}}, {isAdmin: {$eq: 'true'}}]},{ email:1, isAdmin:1,  '_id': false})
  
  if(verificarMail === null){
    let listaPedidos = await pedidos.find().select({'productos':1, 'fecha':1, 'direccion':1, 'formaPago':1, 'total':1, '_id': false});
    res.status(200).json(listaPedidos)
  } else if( verificarMail != null){
    listaPedidos = await pedidos.find().select({'email':1, 'productos':1, 'fecha':1, 'estado':1, 'direccion':1, 'formaPago':1, 'total':1, '_id': false});
    res.status(200).json(listaPedidos)
  }
}

exports.crearPedido = async function crearPedido(req, res, next){
  
  let {email, codProducto, cantidad, direccion, formaPago, estado } = req.body;
  let emailHeaders = req.headers.email
  let emailCorrecto = ""
  let jpl = ""
  //console.log(codProducto)
  if (email === undefined) {
    emailCorrecto = emailHeaders
  } 
  else if(emailHeaders === undefined) {
    emailCorrecto = email
  }
  else if(email === undefined && emailHeaders === undefined){
    //console.log('Estoy en el if')
    await userAuthenticated(req)
    //console.log("userData: "+ userData.email)
    emailCorrecto = userData
    // console.log("email?" + emailCorrecto)
    next()
  }else {
    
    return res.status(403).json("Error de credencial de usuarios")
  }
  if(!emailCorrecto) {
     res.status(403).json("Email incorrecto.")
  }
  
  let productoElegido = await productos.findOne({codProducto});
  //console.log(productoElegido.nombre)
  if(productoElegido === null){
    return res.status(400).json("El codigo de producto ingresado es incorrecto.")
  }
  
  try {
    const nuevoPedido = new pedidos({ 
      email: emailCorrecto ,
      productos: {
      codProducto: codProducto,
      nombre: productoElegido.nombre,
      cantidad: cantidad },
      direccion: direccion,
      formaPago: formaPago,
      total: productoElegido.precio,
      estado: estado }
      );
    await nuevoPedido.save();
      res.status(201).json(`El pedido fue creado satisfactoriamente`);
  } catch (err) {
      let parsedErr = JSON.stringify(err.message.split(":")[0])
      
      if( parsedErr == '"Pedidos validation failed"'){
        return res.status(400).json("Datos del pedido incompletos.")
      }
      console.log(err.message);
  }
}

