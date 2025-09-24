const { cadastrarPremio, resgatarPremio, trazerTodosPremios } = require("../service/PremioService");

async function createPremio(req, res){
    const { imagem, titulo, valor } = req.body;

    if(imagem != null && titulo != null && valor != null){
        const newPremio = {
            imagem: imagem,
            titulo: titulo,
            valor: valor
        }
        
        const result = await cadastrarPremio(newPremio);

        return res.status(201).json(result.message);
    }else{
        return res.status(500).json(result.erro);
    }
}

async function pegarPremio(req, res){
    const { clienteCpf, premioId } = req.body;

    const result = await resgatarPremio(premioId, clienteCpf);

    if("erro" in result){
        return res.status(500).json({erro:result.erro});
    }

    return res.status(200).json({message:result.message});
}

async function pegarTodosOsPremios(req, res){
    const result = await trazerTodosPremios();

    if("erro" in result){
        return res.status(500).json({erro:result.erro});
    }

    return res.status(200).json({premios:result.premios});
}

module.exports = { createPremio, pegarPremio, pegarTodosOsPremios };