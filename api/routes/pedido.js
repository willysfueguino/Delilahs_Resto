const express = require("express");
let router = express.Router();

let  = require("../models/init");

const pedidosController = require("../controllers/pedidosController")
const authController = require("../auth/authController");

/**
 * @swagger
 * /api/pedidos:
 *  get:
 *    tags: [Pedidos]
 *    summary: Listado de pedidos.
 *    description: Ver lista de pedidos. Se requiere credenciales de usuario administrador.
 *    parameters:
 *    - name: email
 *      in: header
 *      description: Email de usuario a logueado.
 *      type: email
 *      example: adm@adm
 *      required: true
 *    responses:
 *       200:
 *         description: Listado de pedidos
 *       403:
 *         description: Error de credenciales de usuario
 */
router.get("/api/pedidos/", authController.authenticated, pedidosController.listarPedidos);

/**
 * @swagger
 * /api/pedidos:
 *  post:
 *    tags: [Pedidos]
 *    summary: Crear pedido nuevo.
 *    description : Crear pedido nuevo.
 *    parameters:
 *    - name: email
 *      in: header
 *      description: Email de usuario a logueado.
 *      type: email
 *      example: adm@adm
 *      required: true
 *    requestBody:
 *      description: Datos para la creacion de un pedido nuevo.
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codProducto
 *               - cantidad
 *               - direccion
 *               - formaDePago
 *             properties:
 *               codProducto:
 *                 description: Código de producto. Verificar viendo el catálogo.
 *                 type: string
 *                 required: true
 *                 example: HAM1
 *               cantidad:
 *                 description: Cantidad del producto.
 *                 type: number
 *                 required: true
 *                 example: "3"
 *               direccion:
 *                 description: Direccion del envio
 *                 type: string
 *                 required: false
 *                 example: A la casa del user 1234
 *               estado:
 *                 description: Estado del pedido. Códigos de Estado (PENdiente, CONfirmado, ENProceso, ENViado, ENTregado)
 *                 type: string
 *                 example: CON
 *               formaPago:
 *                 description: Forma de Pago (EF, TCRED, TDEB, MP)
 *                 type: string
 *                 required: true
 *                 example: EF
 *    responses:
 *      201:
 *       description: Pedido creado
 *      400:
 *       description: Pedido no creado
 *
 */
router.post("/api/pedidos", authController.authenticated, pedidosController.crearPedido );

module.exports = router;
