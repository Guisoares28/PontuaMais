const db = require('../models/index');

async function cadastrarCliente(cliente){
    try{
        const clientFound = await db.Cliente.findByPk(cliente.cpf);

        if(clientFound != null){
            return {erro : "Cliente já cadastrado"};
        }

        const newCliente = await db.Cliente.create(cliente);
        return {mensagem : "Cliente cadastrado com sucesso"};
    }catch(erro){
        return {erro: erro};
    }   
}

async function consultarInfoCliente(clienteCpf){
    try{
        const clienteFound = await db.Cliente.findByPk(clienteCpf);

        if(clienteFound === null){
            return {erro:"Cliente não encontrado"};
        }
        return {
            data:{
                nome: clienteFound.nome,
                totalPontos: clienteFound.pontos,
            }
            
        }
    }catch(erro){
        return {erro:"Erro ao consultar transações"};
    }
}

module.exports = { cadastrarCliente, consultarInfoCliente };