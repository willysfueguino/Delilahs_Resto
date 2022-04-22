const express = require("express");
let router = express.Router();

const authController = require("../auth/authController");
const Controller = require("../controllers/usuarioController");

/**
 * @swagger
 * /api/usuario:
 *  get:
 *    tags: [Usuarios]
 *    summary: Lista de usuarios.
 *    description: Obtener listado de usuarios registrados. Se requiere ser usuario administrador. 
 *    parameters:
 *    - name: email
 *      in: header
 *      description: Email de usuario a logueado.
 *      type: email
 *      example: adm@adm
 *      required: true
 *    responses:
 *      '200':
 *       description: Lista de usuarios
 *      '403':
 *       description: Datos de usuario incorrectos.
 */
router.get(
  "/api/usuario",
  authController.authenticated,
  authController.isAdmin,
  Controller.list
);

/**
 * @swagger
 * /api/usuario/signup:
 *  post:
 *    tags: [Usuarios]
 *    summary: Crear usuario.
 *    description: Crear usuario.
 *    requestBody:
 *      description: Objeto conteniendo los datos del usuario nuevo.
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 description: nombre del usuario a registrar.
 *                 type: string
 *                 example: Pinocho
 *               apellido:
 *                 description: Apellido del usuario a registrar.
 *                 type: string
 *                 example: D Pino
 *               nacimiento:
 *                 description: Nacimiento del usuario a registrar en formato MM/DD/AAAA
 *                 type: date
 *                 example: 09/31/1882
 *               email:
 *                 description: Email del usuario a registrar.
 *                 type: email
 *                 example: admin@localhost.com
 *               pais:
 *                 description: Pais de nacimiento del usuario a registrar.
 *                 type: string
 *                 example: Argentina
 *               pass:
 *                 description: Contrasenia del usuario a registrar.
 *                 type: password
 *                 example: mipass123
 *               direccion:
 *                 description: Direccion del usuario a registrar (opcional).
 *                 type: string
 *                 example: La calle de pinocho 123         
 *               telefono:
 *                 description: Numero telefonico del usuario a registrar.
 *                 type: string
 *                 example: 223-3454357654        
 *             required:
 *               - email
 *               - nombre
 *               - apellido
 *               - nacimiento
 *               - pais
 *               - pass
 *               - telefono
 *    responses:
 *      '201':
 *       description: Usuario creado
 *      '400':
 *       description: Usuario no registrado
 *
 */

router.post(
  "/api/usuario/signup",
  authController.buscaMail,
  Controller.createUsuario
)

module.exports = router;
