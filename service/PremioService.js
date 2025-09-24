const db = require('../models/index');

async function cadastrarPremio(premio){
    try{
        await db.Premio.create(premio);
        return {message:"Prêmio cadastrado com sucesso"};
    }catch(erro){
        return {erro:"Erro ao cadastrar prêmio"};
    }
}

async function resgatarPremio(premioId, clienteCpf){
    try{
        const resultado = await db.sequelize.transaction(async (t) => {
            const cliente = await db.Cliente.findByPk(clienteCpf, { transaction: t });
            const premio = await db.Premio.findByPk(premioId, { transaction: t });

            if(!cliente || !premio){
                
                throw new Error("Nenhum cliente ou prêmio encontrado");
            }

            if(cliente.pontos < premio.valor){
                
                throw new Error("Pontos insuficiente para esse prêmio");
            }

            
            await cliente.decrement({pontos: premio.valor}, { transaction: t });

            
            await cliente.addPremio(premio, { transaction: t });

           
            await db.Transacao.create({
                valor: premio.valor,
                tipo: "Resgate Prêmio",
                cliente_cpf: clienteCpf
            }, { transaction: t });

            return {message: "Prêmio resgatado com sucesso!"};
        });

        return resultado;

    }catch(erro){

        console.error(erro);
        
        
        if (erro.message === "Nenhum cliente ou prêmio encontrado") {
            return {erro: "Nenhum cliente ou prêmio encontrado"};
        }
        if (erro.message === "Pontos insuficiente para esse prêmio") {
            return {erro: "Pontos insuficiente para esse prêmio"};
        }

        return {erro: "Erro ao resgatar prêmio!"};
    }
}

async function trazerTodosPremios(){
    try{
        const premios = await db.Premio.findAll();
        return {premios: premios};
    }catch(erro){
        return {erro:"Erro ao trazer todos os prêmios"};
    }
}

module.exports = { cadastrarPremio, resgatarPremio, trazerTodosPremios };