const { cadastrarCliente, consultarInfoCliente } = require("../service/ClienteService");

async function createCliente(req, res){
    const { cpf, nome, telefone, email } = req.body;

    const newCliente = {
        cpf: cpf,
        nome: nome,
        telefone: telefone,
        email: email
    }

    const verifyError = await cadastrarCliente(newCliente);

    if("erro" in verifyError){
        return res.status(500).json({erro: verifyError.erro});
    }

    return res.status(201).json({mensagem:verifyError.mensagem});
}

async function consultarDadosCliente(req, res){
    const { clienteCpf } = req.body;

    const result = await consultarInfoCliente(clienteCpf);

    if("erro" in result){
        return res.status(500).json({erro:result.erro});
    }

    return res.status(200).header("Access-Control-Allow-Origin").json({mensagem:result.data});

}

module.exports = { createCliente, consultarDadosCliente };