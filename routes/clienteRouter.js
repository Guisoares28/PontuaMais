const express = require("express")
const { createCliente, consultarDadosCliente } = require("../controller/ClienteController");
const { validarToken } = require("../middleware/validarToken");

const clienteRouter = express.Router();

clienteRouter.post("/cadastro", validarToken, createCliente);
clienteRouter.post("/dados", consultarDadosCliente);



module.exports = clienteRouter;