const { Categoria } = require('../models');

const categoriaController = {
    listarCategoria: async (req, res) => {
        const listaDeCategoria = await Categoria.findAll();
        res.json(listaDeCategoria);
    },

    async cadastrarCategoria (req, res) {
        try {
            const { descricao } = req.body;
            await Categoria.create({
                descricao,
             });

             res.status(201).json("Cadastrado com sucesso");
        }
        catch (error) {
            return res.status(500).json('Ocorreu algum problema' + error);
        }
    },

    // async atualizarCategoria (req, res) {
    //     const {id} = req.params;
    //     const {descricao} = req.body;
    //     if (!id) return res.status(400).json('id não enviado');
    //     const categoriaAtualizado = await Categoria.update({
    //         descricao,
    //     },
    //     {
    //         where: {
    //             idcategoria: id,
    //         }
    //     });

    //     res.json(categoriaAtualizado);
    // },

    async deletarCategoria(req, res){
        const {idcategoria} = req.params;
        await Categoria.destroy({
            where: {
                idcategoria: idcategoria
            }
        })
        res.status(200).json("Deletado com sucesso")
    }
};

module.exports = categoriaController