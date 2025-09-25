const db = require('../models/index');


async function cadastrarFuncionario(funcionario){

    try{
        const funcionarioFound = await db.Funcionario.findByPk(funcionario.cpf);

        if(funcionarioFound != null){
            return {erro:"Funcionario já cadastrado"};
        }

       await db.Funcionario.create(funcionario);

       return {mensagem:"Funcionário cadastrado com sucesso"};

    }catch(erro){
        return {erro:"Não foi possível cadastrar o funcionario"};
    }
    
}


async function aumentarPontos(pontos, clienteCpf){
    
    try {
        const resultado = await db.sequelize.transaction(async (t) => {
            const cliente = await db.Cliente.findByPk(clienteCpf, { transaction: t });

            if(cliente === null){
                throw new Error("Cliente não encontrado");
            }
            
            const pontosConvertidos = pontos * (5/100);
            console.log("pontos convertidos com sucesso");

            await cliente.increment({
                pontos: pontosConvertidos
            }, { transaction: t });

            
            await db.Transacao.create({
                valor: pontos,
                cliente_cpf: clienteCpf,
                tipo: "Recebimento"
            }, { transaction: t });

            
            return { message: "Pontos adicionados com sucesso" };
        });

        return resultado;

    } catch(erro) {
        
        console.error(erro);
        
       
        if (erro.message === "Cliente não encontrado") {
            return { erro: "Cliente não encontrado" };
        }
        
        
        return { erro: "Não foi possível adicionar os pontos" };
    }
}


async function diminuirPontos(pontos, clienteCpf){
    try{
        const resultado = await db.sequelize.transaction(async (t) => {
            const cliente = await db.Cliente.findByPk(clienteCpf, { transaction: t });

            if(cliente === null){
                throw new Error("Cliente não encontrado");
            }
            
            if(cliente.pontos < pontos){
                await cliente.update({ pontos: 0 }, { transaction: t });
                return {message:"Pontos retirados com sucesso!"};
            }

            await cliente.decrement({
                pontos: pontos
            }, { transaction: t });

            await db.Transacao.create({
                valor: pontos,
                cliente_id: clienteCpf,
                tipo: "Resgate"
            }, { transaction: t });

            return {message:"Pontos retirados com sucesso!"};
        });

        return resultado;

    }catch(erro){
        
        console.error(erro); 
        
        if (erro.message === "Cliente não encontrado") {
            return { erro: "Cliente não encontrado" };
        }
        
        return {erro: "não foi possível retirar os pontos"};
    }
}

module.exports = { cadastrarFuncionario, aumentarPontos, diminuirPontos };