const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const pino = require("pino")(require("path").join(`${process.env.PATH_LOGS}`))
const logger = require("pino-http")({
  logger: pino,
  useLevel: "info",
});

const dbMysql = require("../database/config");

// require('../database/associations');
class Server {
  
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.path = "/api";

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {

    try {
      await dbMysql.sync({force: false});
      // await dbMysql.authenticate();
      console.log('Database online');
    } catch (error) {
      throw new Error( error );
    }
  }

  middlewares() {
    // CORS
    // this.app.use(bodyParser.urlencoded({ extended: false }))
    // this.app.use(bodyParser.json())
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));

    // Logs
    this.app.use(logger)
  }

  routes() {
    this.app.use(this.path, require("../routes/index"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}
module.exports = Server;
