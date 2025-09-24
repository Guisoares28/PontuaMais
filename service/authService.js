const db = require('../models/index');
const jwt = require("jsonwebtoken");
require('dotenv').config();

async function gerarToken(funcionario){
    return jwt.sign(
        {username: funcionario.username},
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );

}

async function autenticarFuncionario(funcionario){
    const funcionarioFound = await db.Funcionario.findByPk(funcionario.username);

    if(funcionarioFound === null || funcionarioFound === undefined){
        return {erro:"Funcionário não encontrado"};
    }

    if(funcionario.password != funcionarioFound.password){
        return {erro:"Usuário ou Senha incorretos"};
    }

    const token = await gerarToken(funcionario);

    return {token: token};
}

module.exports = { autenticarFuncionario };