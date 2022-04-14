const { Router } = require("express");
const router = Router();

const Controller = require("../auth/authController");

/**
 * @swagger
 * /api/auth/signin:
 *  post:
 *    tags: [Usuarios]
 *    summary: Login de usuario.
 *    description: Login de usuario.
 *    requestBody:
 *      description: Email y contraseña de usuario a loguearse
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 description: Email de usuario a loguearse.
 *                 type: email
 *                 example: admin@localhost.com
 *               pass:
 *                 description: Contraseña de usuario a loguearse
 *                 type: string
 *                 example: 1234
 *             required:
 *               - pass
 *               - email
 *    responses:
 *      '200':
 *       description: Login de usuario satisfactorio.
 *      '403':
 *       description: Datos de usuario incorrectos.
 */

router.post("/api/auth/signin", Controller.signin);

module.exports = router;
