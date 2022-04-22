const express = require("express");
let router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *    description: Descripcion de la API
 *    tags: [API version]
 *    summary: Version de API 
 *    responses:
 *      200:
 *        description: Descripción de la versión
 *      304:
 *        description: Descripción de la versión
 */
router.get("/", function (req, res) {
  res.send({ programa: "Resto Delilahs v1.2.0" });
});

module.exports = router;
