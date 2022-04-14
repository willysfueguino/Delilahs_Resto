const router = require('express').Router()
const express = require('express')
const passport = require('passport');
const session = require('express-session')
const {userAuthenticated} = require("../auth/authController")

const {generateJwt} = require("../helpers/generateJwt");
const usuarios = require('../models/usuarios')

let OpenIDConnectStrategy = require('passport-openidconnect');

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
 
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new OpenIDConnectStrategy({
issuer: 'https://' + process.env.AUTH0_DOMAIN + '/',
authorizationURL: 'https://' + process.env.AUTH0_DOMAIN + '/authorize',
tokenURL: 'https://' + process.env.AUTH0_DOMAIN + '/oauth/token',
userInfoURL: 'https://' + process.env.AUTH0_DOMAIN + '/userinfo',
clientID: process.env.AUTH0_CLIENT_ID,
clientSecret: process.env.AUTH0_CLIENT_SECRET,
callbackURL: '/login/callback',
scope: [ 'profile', 'email' ]
},
function verify(issuer, profile, cb) {
  if(profile){
      userEmail = profile.emails[0].value
      userProfile = profile
      whoIs = profile.id
    }
    return cb(null,profile)
    }
));


router.use(express.json())
router.use(session({ secret: 'keyboard cat~troubles', secured:true, key: 'sid', saveUninitialized: true, resave: false}));
router.use(passport.initialize())
router.use(passport.session())



var userProfile = ""
let userEmail = ""
let whoIs = ""
let token = ""

async function createUser(res,next) {
  try {
      //console.log(userProfile)
      token = await generateJwt(whoIs, process.env.JWT_SECRET_KEY);
      const nAccount = new usuarios({ 
        nombre: userProfile.name.givenName,
        apellido: userProfile.name.familyName,
        auth0Id: whoIs,
        email: userEmail,
        token: token
      });
      await nAccount.save()
      return res.status(201).json({Status: "Cuenta creada exitosamente", token: token});   
  } catch (error) {
    console.log(error)
    return res.redirect('/api/auth0/logged')
  } 
}

async function findUser(res, next){
  try{
      let email = userEmail
      let mailEncontrado = await usuarios.findOne( {email} )
      if (!mailEncontrado ){
        return res.redirect('/api/auth0/register')
      }
      else {
        token = await generateJwt(whoIs, process.env.JWT_SECRET_KEY);
        let userID = await usuarios.findOneAndUpdate(
          {email},
          { nombreAuth0: userProfile.name.givenName,
            apellidoAuth0: userProfile.name.familyName,
            auth0Id: whoIs, 
            token: token},
          { new: true }
        )
        return res.redirect('/api/auth0/logged')
      }
      
    }
    catch (err) {
      console.log(err)
    }    
}
async function isUserAuthenticated(req,res){
  userAuthenticated(req,res)
}

/**
 * @swagger
 * /api/auth0/login:
 *  get:
 *    tags: [Auth0]
 *    summary: Login de usuario.
 *    description: Redirige al URL de inicio de sesión con auth0. Solo puede ejectuarse desde el navegador.
 */

router.get('/api/auth0/login', passport.authenticate('openidconnect',{prompt: 'login', failureMessage: true}));

/**
 * @swagger
 * /api/auth0/users:
 *  get:
 *    tags: [Auth0]
 *    summary: Búsqueda de usuario.
 *    description: Recibe datos del login de auth0 y captura los datos de respuesta. 
 *                 Si se encuentra registrado y nunca se logueó con auth0 añade datos 
 *                 de auth0 a los datos del usuario (los actualiza cada vez que loguea 
 *                 de esta forma). Sino, redirige al endpoint /api/auth0/register.
 */

router.get('/api/auth0/users', async (req, res,next) => {
  findUser(res, next)
})

/**
 * @swagger
 * /api/auth0/register:
 *  get:
 *    tags: [Auth0]
 *    summary: Registro de usuario.
 *    description: Registra al usuario en la DB. Utiliza los datos proveidos por Auth0.
 *    responses:
 *      '201':
 *       description: Registro de usuario satisfactorio.
 *      'ERR':
 *       description: Redirige al endpoint /api/auth0/logged.
 */

router.get('/api/auth0/register', async (req, res,next) => {
  createUser(res, next)
})

/**
 * @swagger
 * /login/callback:
 *  get:
 *    tags: [Auth0]
 *    summary: Funcion callback de Auth0.
 *    description: Middleware de logue de Auth0 que no imprime datos.
 */

router.get('/login/callback', passport.authenticate('openidconnect', {
  successRedirect: '/api/auth0/users',
  failureRedirect: '/api/auth0/login'
}));

/**
 * @swagger
 * /api/auth0/logged:
 *  get:
 *    tags: [Auth0]
 *    summary: Estado de usuario.
 *    description: Imprime los datos del usuario si el login es exitoso.
 *    responses:
 *      '201':
 *       description: Login de usuario satisfactorio.
 *      '401':
 *       description: Error de autenticación.
 */

router.get('/api/auth0/logged', (req, res) => {
    if(whoIs === ""){
      return res.status(401).json('Error de autenticacion')
    }
    else {
      //
      return res.status(201).json({Status: 'Usuario logueado. ID = '+ whoIs, Token: token, Email: userEmail})
    }
})

/**
 * @swagger
 * /api/auth0/logout:
 *  get:
 *    tags: [Auth0]
 *    summary: Cierre de sesión.
 *    description: Cierra la sesión del usuario.
 *    responses:
 *      '201':
 *       description: Cierre de sesión satisfactorio.
 *      '401':
 *       description: No hay usuarios autenticados.
 */

router.get('/api/auth0/logout', (req, res) => {
  
    if(!req.user){
      res.status(401).json("No hay usuario autenticado")
    }
    req.logout()
    res.status(201).json("Sesion finalizada exitosamente.")
})
module.exports = router



