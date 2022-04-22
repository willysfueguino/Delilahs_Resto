const express = require("express");
let router = express.Router();

const productsController = require("../controllers/productosController")
const authController = require("../auth/authController");

/**
 * @swagger
 * /api/productos:
 *  get:
 *    tags: [Productos]
 *    summary: Catalogo de productos.
 *    parameters:
 *    - name: email
 *      in: header
 *      description: Email de usuario logueado.
 *      type: email
 *      example: adm@adm
 *      required: true
 *    responses:
 *       200:
 *         description: Listado de pedidos
 */
router.get("/api/productos", authController.authenticated, productsController.findProducts , function (req, res) {
  
});

/**
 * @swagger
 * /api/productos:
 *  post:
 *    tags: [Productos]
 *    summary: Creacion de producto nuevo.
 *    description : Creacion de producto nuevo. Requiere credenciales de usuario administrador.
 *    parameters:
 *    - name: email
 *      in: header
 *      description: Email de usuario admin logueado.
 *      type: email
 *      example: adm@adm
 *      required: true
 *    requestBody:
 *      description: Datos de producto nuevo.
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo
 *               - nombre
 *               - descripcion
 *               - tipo
 *               - tamanio
 *               - precio
 *               - stock
 *             properties:
 *               codigo:
 *                 description: Código del producto a crear
 *                 type: string
 *                 example: XX
 *               nombre:
 *                 description: Nombre del producto
 *                 type: string
 *                 example: Ensalada Verde
 *               descripcion:
 *                 description: Descripcion del producto
 *                 type: string
 *                 example: Ensalada verde en base a vegetales
 *               tipo:
 *                 description: Tipo de producto
 *                 type: string
 *                 example: Plato principal
 *               tamanio:
 *                 description: Tamanio de producto
 *                 type: string
 *                 example: 200ML
 *               precio:
 *                 description: Precio de venta del producto
 *                 type: float
 *                 example: 100
 *               stock:
 *                 description: Stock
 *                 type: integer
 *                 example: 1000
 *    responses:
 *      201:
 *       description: Producto creado
 *      401:
 *       description: Producto no creado
 *
 */
router.post(
  "/api/productos",
  authController.authenticated,
  authController.isAdmin,
  productsController.createProduct
);

/**
 * @swagger
 * /api/productos:
 *  put:
 *    tags: [Productos]
 *    summary: Actualizacion de producto.
 *    description: Actualizacion de producto. Requiere credenciales de usuario administrador.
 *    parameters:
 *    - name: email
 *      in: header
 *      description: Email de usuario admin logueado.
 *      type: email
 *      example: adm@adm
 *      required: true
 *    requestBody:
 *      description: Datos de producto a modificar.
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo
 *               - nvoCodigo
 *               - nombre
 *               - descripcion
 *               - tipo
 *               - tamanio
 *               - precio
 *               - stock
 *             properties:
 *               codigo:
 *                 description: Código del producto a modificar
 *                 type: string
 *                 example: EC
 *               nvoCodigo:
 *                 description: Código del producto actualizado
 *                 type: string
 *                 example: CHO
 *               nombre:
 *                 description: Nombre del producto actualizado
 *                 type: string
 *                 example: Choripan
 *               descripcion:
 *                 description: Descripcion del producto actualizado
 *                 type: string
 *                 example: Choripan de pollo a la estaca con salsa de mayonesa al apio pa' los pi'
 *               tipo:
 *                 description: Tipo de producto
 *                 type: string
 *                 example: Entrada
 *               tamanio:
 *                 description: Tamanio de producto
 *                 type: string
 *                 example: normal
 *               precio:
 *                 description: Precio de venta del producto
 *                 type: float
 *                 example: 300
 *               stock:
 *                 description: Stock
 *                 type: integer
 *                 example: 1000
 *    responses:
 *      201:
 *       description: Producto actualizado
 *      401:
 *       description: Producto no actualizado
 *
 */

router.put(
  "/api/productos/",
  authController.authenticated,
  authController.isAdmin,
  productsController.updateProducts
);

module.exports = router;
