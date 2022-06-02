const { response } = require('express');
const { Carteira, Categoria, Usuarios } = require('../models');
const { QueryTypes } = require('sequelize');
const sequelize = require('../database'); 

const carteiraController = {

    async saldos (req, res) {
        const { id } = req.params;
        const saldoAtual = 0;
        const receitas = await sequelize.query("select sum(valor) as receitas from mydb.carteira where idusuario = ? and tipo = 'receita'",{ replacements: [id], type: QueryTypes.SELECT, });
        const  despesas  = await sequelize.query("select sum(valor) as despesas from mydb.carteira where idusuario = ? and tipo = 'despesa'",{ replacements: [id], type: QueryTypes.SELECT, });
        const despesasCompartilhadas = await sequelize.query("select sum(valor) as despesasCompartilhadas from carteira where idusuario = ? and compartilha  = 1",{ replacements: [id], type: QueryTypes.SELECT, });

        const dadosCard = [
            {
              descricao: "Saldo atual",
              valor: saldoAtual,
            },
            {
              descricao: "Receitas",
              valor: receitas[0].receitas,
            },
            {
              descricao: "Despesas",
              valor: despesas[0].despesas,
            },
            {
              descricao: "Despesas compartilhadas",
              valor: despesasCompartilhadas[0].despesasCompartilhadas,
            }
        ]

        res.json(dadosCard);
    },


    listarTransacao: async (req, res) => {
        const { id } = req.params;
        const listaDeTransacao = await sequelize.query(
            "select a.descricao as produto, a.valor, a.data, a.tipo, b.descricao as categoria from mydb.carteira a left join mydb.categoria b on a.categoria_idcategoria = b.idcategoria where idusuario = ?",
             {
                replacements: [id],
                 type: QueryTypes.SELECT, 
                });

                 if (listaDeTransacao.rowCount === 0) {                    
                   return res.status(500).json({ mensagem: 'Não foi possivel listar as transações' })}
        
        res.json(listaDeTransacao);
    
    },

    async cadastrarTransacao (req, res) {
        
        try {
        const { valor, data, descricao, categoria_idcategoria, tipo, idusuario, status  } = req.body;
        if (!valor || !data || !descricao || !categoria_idcategoria || !tipo || !idusuario || status) {
            return res.status(400).json({ mensagem: 'Todos os campos devem ser informados' })
        }
    
        if (tipo !== 'receita' && tipo !== 'despesa') {
            return res.status(400).json({ mensagem: 'O tipo pode ser apenas receita ou despesa' });
        }
            const novaTransacao = await Carteira.create({
                descricao,
                valor,
                data,
                tipo,
                categoria_idcategoria,
                idusuario,
                status
            }); 

            res.status(201).json(novaTransacao);
        }            
         catch (error) {
            return res.status(500).json('Ocorreu algum problema' + error);
        }
    },

    async  atualizarTransacao(req, res) {
    //    const { usuario } = req;
        const { id } = req.params;
        const { valor, data, descricao, categoria_idcategoria, tipo, idusuario, status } = req.body;
    
        if (!valor || !data || !descricao || !categoria_idcategoria || !tipo) {
            return res.status(400).json({ mensagem: 'Todos os campos devem ser informados' })
        }
    
        if (tipo !== 'despesa' && tipo !== 'receita') {
            return res.status(400).json({ mensagem: 'O tipo pode ser apenas despesa ou receita' });
        }
    
        try {
            const transacaoAtualizada = await Carteira.update(
                {
                valor, 
                data, 
                descricao, 
                categoria_idcategoria, 
                tipo,
                idusuario,
                status,
            },
            {
                where: {
                    idcarteira:id
                },
                
            },            
            ) 
            res.status(201).json(transacaoAtualizada);          
    
            if (transacao.rowCount === 0) {
                return res.status(400).json({ mensagem: 'A transação não foi encontrada' });
            } 
            if (transacaoAtualizada.rowCount === 0) {
                return res.status(400).json({ mensagem: 'Não foi possível atualizar esta transação' })
            }
    
            return res.status(200).json(204);
        } catch (error) {
            return res.status(400).json({ mensagem: 'Ocorreu um erro desconhecido - ' + error.message })
        }
    },

    async deletarTransacao(req, res){
        const { id } = req.params;
        try{
            await Carteira.destroy({
                where:{
                    idcarteira: id,
                },
            });
            res.status(200).json('Excluido com sucesso');
        }catch (error) {
            return res.status(400).json({ mensagem: 'Ocorreu um erro desconhecido - ' + error.message })
        }
    },

    async obterExtratoReceita(req, res) {
        const { id } = req.params;
        const obterTotal = await sequelize.query(
            "select * from mydb.carteira where idusuario = ? and tipo = 'receita'",
             {
                replacements: [id],
                 type: QueryTypes.SELECT, 
                });            
        res.json(obterTotal);
    },
    async obterExtratoDespesa(req, res) {
        const { id } = req.params;
        const obterTotal = await sequelize.query(
            "select * from mydb.carteira where idusuario = ? and tipo = 'despesa'",
             {
                replacements: [id],
                 type: QueryTypes.SELECT, 
                });            
        res.json(obterTotal);
    }
}

module.exports = carteiraController