const { Router } = require("express");
const router = Router();

const Controller = require("../auth/authController");

/**
 * @swagger
 * /api/auth/signin:
 *  post:
 *    tags: [Usuarios]
 *    summary: Login de usuario.
 *    description: Para probar correctamente los endpoints, se debe ejecutar primero la funcion Login de Usuario (Las credenciales de ejemplo son las del usuario administrador para poder comprobar correctamente los endpoints que requieren privilegios de administrador). Luego de loguearse, copiar el token recibido desde el backend (sin las comillas). Hacer click en la parte superior derecha de la página, en el botón Authorize (tiene una imagen de un candado). Se abrirá un cuadro de diálogo. En la casilla de texto Value, pegar el token recibido sin las comillas, luego hacer click en Authorize. Ejemplo de Token; eyJhbGciOiJIUzI1Nig5HnR5cCI6IkpXVCJ9.eyJ1aWQiOnsiZW1haWwiOiJhZG1AYWR5H5wicGFzcyI6IkRlTGlMYUhzIn0sImlhdCI6MTY1MDA3NDc2NiwiZXhwIjoxNjUwMDg5MTY2fQ.zxkhymxF2DD3JZikVi6sQfsVmdY60RmhIcVPic4lOL
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
