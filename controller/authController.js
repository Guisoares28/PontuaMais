const { autenticarFuncionario } = require("../service/authService");


async function validarLogin(req, res){
    const { username, password } = req.body;

    const funcionario = { username: username, password: password};

    const result = await autenticarFuncionario(funcionario);

    if("erro" in result){
        return res.status(401).json({erro: result.erro});
    }

    return res.status(200).json({message: result.token});
}

module.exports = { validarLogin };