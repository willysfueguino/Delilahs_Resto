const {generateJwt} = require("../helpers/generateJwt");
const jwt = require("jsonwebtoken")
const usuarios = require("../models/usuarios")
let jpl = ""
let userData = ""

exports.buscaMail = async function buscaMail(req, res, next) {
  try{
      //console.log("estoy en buscaMail")
      let email = req.body.email


      let mailEncontrado = await usuarios.findOne( {email} )//.select({'email':1, '_id': false});
      //console.log({email: email})
      //console.log("|"+mailEncontrado+"|")
      if (!mailEncontrado ){
        next()
      }
      
      else {
        res.status(400).json("El mail ingresado ya está registrado")
      }
      
    }
    catch (err) {
      console.log(err)
    }    
}

// Login
exports.signin = async function signin(req, res, next) {
  
  let email = req.headers.email
  let password = req.headers.password
  let token = undefined
  //console.log(email + " " + password)

  if(req.body === ""){
    res.status(401).json("Los datos deben ser pasados por headers")
  }

  try {                  ///////////// VERIFICACION EMAIL PASADO POR HEADERS
    //console.log("estoy en el try")
    let verificarMail = await usuarios.findOne({email: {$eq: email}} ,{email:1, pass:1,'_id': false})
    let verificarPass = await usuarios.findOne({pass: {$eq: password}} ,{ pass:1,  '_id': false})
    
    if(!verificarMail){
      return res.status(403).json("Debe ingresar un email.")
    }
    if(!verificarPass){
      return res.status(403).json("Debe ingresar una contraseña válida.")
    }
    
    if(verificarMail.email === email){
      if(verificarPass.pass === verificarMail.pass){
        token = await generateJwt(verificarMail, process.env.JWT_SECRET_KEY);
        res.status(200).json({ status: "signin", token });      
        userToken = await usuarios.findOneAndUpdate(
          {email},
          { token: token },
          { new: true }
        )
      }
    } else {
      
      return res.status(403).send("Datos de usuario incorrectos.")
    }
    
  } catch (err) {
    //console.log("error mail body = " +err);
  }
    //console.log("user Token: " + token)
    next()
    
  };

// Autenticar
exports.authenticated = async function authenticated(req, res, next) {
  let email = req.body.email
  let emailHeaders = req.headers.email
  let emailCorrecto = ""
  let token = req.headers.authorization
  
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
  //console.log(email === undefined && emailHeaders === undefined)
  //console.log("email = |" + email + " emailHeaders = |" +  emailHeaders)

  try {
      

      //let verificarMail = await usuarios.findOne({ $and: [{ email: {$eq: emailCorrecto}}, {token: {$eq: token}}]},{token:1,  '_id': false})
      //if (token === verificarMail){
//        console.log("token= " + token)
      //  console.log("tokenMail= " + verificarMail)
      //}
      //console.log({token: token})
      if(!token){ return res.status(403).json("Error de credenciales de usuario")}
      if(token === undefined ){ return res.status(403).json("Error de credenciales de usuario")}
      
      token = req.headers.authorization.split(" ")[1];
      //res.send(JSON.stringify(token))
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, authData) => {
        if (err) {
          if(err.message == "jwt malformed"){
            res.status(403).json("Usuario no logueado.")
          }
          if ( err.message == 'jwt expired' ){
            res.status(403).json("Sesión de usuario expirada.")
          }
          
        } else {
          
          let base64Url = token.split('.')[1];
          let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          let jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          //console.log(jsonPayload)
          jsonPayload = jsonPayload.split(':')[2]
          jsonPayload = jsonPayload.split('}')[0]
          jsonPayload = jsonPayload.split(',')[0]
          //console.log(jsonPayload)
          //console.log(`"${emailCorrecto}"` + jsonPayload)
          if( `"${emailCorrecto}"` != jsonPayload){
            return res.status(403).json("El mail ingresado no coincide con su credencial de autorizacion.")
          } 
          if(email === undefined && emailHeaders === undefined){
            console.log("estoy en el 2do if")
            next()
          }
          else {
            next();
          }
        }


      });
    
  } catch (err) {
      console.log(err)
  }
};

//Obtener datos de auth0 del usuario desde la db
async function userAuthenticated(req, res, next) {
  let token = req.headers.authorization
  if(!token){ return res.status(403).json("Error de credenciales de usuario")}
  if(token === undefined ){ return res.status(403).json("Error de credenciales de usuario")}
  try {
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
        jpl = jpl.split(':')[1];

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
    // console.log("jplultio:"+jpl.length)
    
    let verificarMail = await usuarios.findOne({auth0Id: {$eq: jpl}} ,{email:1,'_id': false})
    
    userData = verificarMail.email
    // console.log("userData: "+ userData)  
  } catch (err) {
      console.log(err)
  }
  
}

// Usuario es admin
exports.isAdmin = async function isAdmin(req, res, next) {
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

  if(!emailCorrecto) {

     res.status(403).json("Email incorrecto.")
    }

  try{
    
      let verificarMail = await usuarios.findOne({ $and: [{ email: {$eq: emailCorrecto}}, {isAdmin: {$eq: 'true'}}]},{ email:1, isAdmin:1,  '_id': false})
      //console.log("verificar email " + verificarMail)
      if (verificarMail != null) {
        next()
      }
      //   console.error("Acceso denegado: ");
      //   return res.status(403).send({ status: "Acceso denegado" });
      // } else {
      //   //console.log("AUTORIZADO")
      //   next();
      // }
    }
  catch(err){
    console.log(err.message)
    return res.status(500).send("Error interno.")
  }
};
