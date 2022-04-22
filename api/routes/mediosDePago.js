const express = require("express");
const router = express.Router();

let mediosDePagoController  = require("../controllers/mediosDePagoController");

const authController = require("../auth/authController");

/**
 * @swagger
 * /api/mediosDePago:
 *  get:
 *    tags: [Medios de pago]
 *    summary: Listado de medios de pago
 *    description: Listado de medios de pago
 *    parameters:
 *    - name: email
 *      in: header
 *      description: Email de usuario a logueado.
 *      type: email
 *      example: adm@adm
 *      required: true
 *    responses:
 *      '200':
 *       description: Se obtiene la lista de medios de pago
 *      '404':
 *       description: Usuario no encontrado (email y/o contraseña incorrecta)
 */


router.get(
  "/api/mediosDePago",
  authController.authenticated, mediosDePagoController.listarMediosDePago
);


/**
 * @swagger
 * /api/mediosDePago/admin:
 *  get:
 *    tags: [Medios de pago]
 *    summary: Listado de medios de pago modo admin
 *    description: Listado de medios de pago modo admin
 *    parameters:
 *    - name: email
 *      in: header
 *      description: Email de usuario a logueado.
 *      type: email
 *      example: adm@adm
 *      required: true
 *    responses:
 *       200:
 *         description: Listado de medios de pago
 *       400:
 *         description: No existen medios de pago creados.
 */

router.get(
  "/api/mediosDePago/admin",
  authController.authenticated, authController.isAdmin, mediosDePagoController.listarMediosDePagoAdmin
);

/**
 * @swagger
 * /api/mediosDePago:
 *  post:
 *    tags: [Medios de pago]
 *    summary: Crear medio de pago
 *    description: Crear medio de pago. Requiere credenciales de usuario administrador.
 *    parameters:
 *    - name: email
 *      in: header
 *      description: Email de usuario a logueado.
 *      type: email
 *      example: adm@adm
 *      required: true
 *    requestBody:
 *      description: Objeto medio de pago nuevo.
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo
 *               - descripcion
 *             properties:
 *               codigo:
 *                 description: Código de la forma de pago
 *                 type: string
 *                 example: EF
 *               descripcion:
 *                 description: Descripcion de la forma de pago
 *                 type: string
 *                 example: Efectivo
 *    responses:
 *      201:
 *       description: Forma de pago creada
 *      400:
 *       description: Forma de pago no creada
 *
 */
router.post(
  "/api/mediosDePago",
  authController.authenticated,
  authController.isAdmin,
  mediosDePagoController.crearMediosDePago)

/**
 * @swagger
 * /api/mediosDePago:
 *  delete:
 *    tags: [Medios de pago]
 *    summary: Borrar medio de pago
 *    description: Borrar medio de pago. Requiere credenciales de usuario administrador.
 *    parameters:
 *    - name: email
 *      in: header
 *      description: Email de usuario a logueado.
 *      type: email
 *      example: adm@adm
 *      required: true
 *    requestBody:
 *      description: Objeto medio de pago a eliminar.
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo
 *             properties:
 *               codigo:
 *                 description: Código de la forma de pago a eliminar.
 *                 type: string
 *                 example: EF
 *    responses:
 *      201:
 *       description: Forma de pago eliminada
 *      400:
 *       description: Forma de pago no eliminada (Verificar código de medio de pago ingresado).
 *
 */

router.delete(
  "/api/mediosDePago",
  authController.authenticated,
  authController.isAdmin,
  mediosDePagoController.eliminarMediosDePago   
)

/**
 * @swagger
 * /api/mediosDePago:
 *  put:
 *    tags: [Medios de pago]
 *    summary: Modificar medio de pago
 *    description: Modificar medio de pago. Requiere credenciales de usuario administrador.
 *    parameters:
 *    - name: email
 *      in: header
 *      description: Email de usuario a logueado.
 *      type: email
 *      example: adm@adm
 *      required: true
 *    requestBody:
 *      description: Objeto medio de pago a modificar.
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo
 *               - nvoCodigo
 *               - descripcion
 *             properties:
 *               codigo:
 *                 description: Código de la forma de pago a modificar
 *                 type: string
 *                 example: EF
 *               nvoCodigo:
 *                 description: Nuevo codigo de la forma de pago
 *                 type: string
 *                 example: QR
 *               descripcion:
 *                 description: Descripcion de la forma de pago actualizada
 *                 type: string
 *                 example: Efectivo
 *    responses:
 *      201:
 *       description: Forma de pago actualizada exitosamente
 *      400:
 *       description: Forma de pago no actualizada (verificar código de medio de pago a modificar).
 *
 */
router.put(
  "/api/mediosDePago",
  authController.authenticated,
  authController.isAdmin,
  mediosDePagoController.modificarMediosDePago   
)

module.exports = router;
