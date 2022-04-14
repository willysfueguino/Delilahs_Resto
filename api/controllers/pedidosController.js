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
  } else if(emailHeaders === undefined) {
    emailCorrecto = email
  } else {
    res.status(403).json("Error de credencial de usuarios")
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
  let emailCorrecto = null
  let jpl = ""
  //console.log(codProducto)
  if(email === undefined && emailHeaders === undefined){
      token = req.headers.authorization.split(" ")[1];
    
       jwt.verify(token, process.env.JWT_SECRET_KEY, (err, authData) => {
      
        
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        // console.log(jsonPayload)
        jsonPayload = jsonPayload.split(':')[1]
        //jsonPayload = jsonPayload.split('}')[0]
        jsonPayload = jsonPayload.split(',')[0]
        // console.log("jpl: " + jsonPayload)
        //console.log(`"${emailCorrecto}"` + jsonPayload)
        // if( `"${emailCorrecto}"` != jsonPayload){
        //   return res.status(403).json("El mail ingresado no coincide con su credencial de autorizacion.")
        // } 
        // else {
        //   next();
        // }
        jpl = jpl.split(':')[1];
        
        //jpl = jpl.split('"')[0]
        // console.log("jsonP "+jsonPayload)
        // console.log("jsonP "+jsonPayload.length)
        if (err) {
          if(err.message == "jwt malformed"){
            res.status(403).send("Usuario no logueado.")
          }
          if ( err.message == 'jwt expired' ){
            res.status(403).send("Sesión de usuario expirada.")
          }
          
        }
        return jpl = jsonPayload
      
    });
      jpl = jpl.split('"')[1];
      jpl = jpl.split('"')[0];
  } 
  let verificarMail = await usuarios.findOne({auth0Id: {$eq: jpl}} ,{email:1,'_id': false})
  emailCorrecto = verificarMail.email
  // console.log("userData: "+ userData)   
  if (email === undefined && !emailCorrecto) {
    emailCorrecto = emailHeaders
  } else if(emailHeaders === undefined && !emailCorrecto) {
    emailCorrecto = email
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

