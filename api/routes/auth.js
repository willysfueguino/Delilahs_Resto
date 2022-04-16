const { Router } = require("express");
const router = Router();

const Controller = require("../auth/authController");

/**
 * @swagger
 * /api/auth/signin:
 *  post:
 *    tags: [Usuarios]
 *    summary: Login de usuario.
 *    description: Email y contraseña de usuario a loguearse
 *    parameters:
 *    - name: email
 *      in: header
 *      description: Email de usuario a loguearse.
 *      type: email
 *      example: adm@adm
 *      required: true
 *    - name: password
 *      in: header
 *      description: Contraseña de usuario a loguearse
 *      type: string
 *      example: DeLiLaHs
 *      required: true
 *    responses:
 *      '200':
 *       description: Login de usuario satisfactorio.
 *      '403':
 *       description: Datos de usuario incorrectos.
 */

router.post("/api/auth/signin", Controller.signin);

module.exports = router;
