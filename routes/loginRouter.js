const express = require("express")
const { validarLogin } = require("../controller/authController");

const loginRouter = express.Router();

loginRouter.post("/", validarLogin);

module.exports = loginRouter;