const express = require("express")
const { createFuncionario, adicionarPontos, subtrairPontos } = require("../controller/FuncionarioController")
const { validarToken } = require("../middleware/validarToken");

const FuncionarioRouter = express.Router();



FuncionarioRouter.post("/cadastro", createFuncionario);
FuncionarioRouter.post("/pontos/adicionar", validarToken, adicionarPontos);
FuncionarioRouter.post("/pontos/subtrair", validarToken,  subtrairPontos);


module.exports = FuncionarioRouter;