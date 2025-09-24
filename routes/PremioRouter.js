const express = require("express")
const { createPremio, pegarPremio, pegarTodosOsPremios } = require("../controller/PremioController");
const { validarToken } = require("../middleware/validarToken");

const PremioRouter = express.Router();

PremioRouter.post("/cadastro", validarToken, createPremio);
PremioRouter.post("/pegar/premio", validarToken, pegarPremio);
PremioRouter.get("/todos", pegarTodosOsPremios);

module.exports = PremioRouter;