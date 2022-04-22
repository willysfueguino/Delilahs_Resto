const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet")
require("dotenv").config();
const db = require("../config/db");

//Swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.3", // present supported openapi version
    info: {
      title: "Delilahs Resto",
      version: "1.2",
      description: "Documentación de Endpoints.",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./api/routes/program.js",
    "./api/auth/auth0.js ",
    "./api/routes/auth.js",
    "./api/routes/usuario.js",
    "./api/app.js",
    "./api/routes/pedido.js",
    "./api/routes/mediosDePago.js",
    "./api/controllers/paypal.js ",
    "./api/routes/producto.js",
    
  ],
  tags: [
    {
      name: "general",
      description: "Operaciones generales",
    },
    {
      name: "auth",
      description: "Operaciones sobre autorización",
    },
    {
      name: "usuarios",
      description: "Operaciones sobre usuarios",
    },
    {
      name: "pedidos",
      description: "Operaciones sobre pedidos",
    },
    {
      name: "productos",
      description: "Operaciones sobre productos",
    },
    {
      name: "Medios de pago",
      description: "Operaciones sobre medios de pago",
    },
    {
      name: "Paypal",
      description: "Operaciones con paypal,",
    },
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Inicializacion del server
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet())

const program = require("./routes/program.js");
app.use("/", program);
/*app.get('/', (req, res, next) =>{
  res.redirect('/api')
})*/

// Importación de rutas
const authRoutes = require("./routes/auth");
const usuarioRoutes = require("./routes/usuario");
const productoRoutes = require("./routes/producto");
const pedidoRoutes = require("./routes/pedido");
const mediosDePagoRoutes = require("./routes/mediosDePago");
const auth0router = require('./auth/auth0')
const paypalRouter = require('./controllers/paypal')

app.use(authRoutes);
app.use(usuarioRoutes);
app.use(productoRoutes);
app.use(pedidoRoutes);
app.use(mediosDePagoRoutes);
app.use(auth0router);
app.use(paypalRouter)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// view in localhost:5000/api-docs

app.listen(process.env.APP_PORT, function () {
  console.log(`Escuchando el puerto ${process.env.APP_PORT}!`);
});
