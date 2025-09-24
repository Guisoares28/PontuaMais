const { cadastrarFuncionario, aumentarPontos, diminuirPontos } = require("../service/FuncionarioService");



async function createFuncionario(req, res){

    const { username, password } = req.body;

    const newFunc = {
        username: username,
        password: password
    }

    const verifyError = await cadastrarFuncionario(newFunc);

    if("erro" in verifyError){
        return res.status(500).json({erro:verifyError.erro});
    }

    return res.status(201).json({message: verifyError.mensagem});
}

async function adicionarPontos(req, res){
    const { pontos, clienteCpf } = req.body

    const verify = await aumentarPontos(pontos, clienteCpf);

    if("erro" in verify){
        return res.status(500).json({erro:verify.erro});
    }

    return res.status(200).json({message:verify.message});
}

async function subtrairPontos(req, res){
    const { pontos, clienteCpf } = req.body

    const verify = await diminuirPontos(pontos, clienteCpf);

    if("erro" in verify){
        return res.status(500).json({erro:verify.erro});
    }

    return res.status(200).json({message:verify.message});
}


module.exports = { createFuncionario, adicionarPontos, subtrairPontos };