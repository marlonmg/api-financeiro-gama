const { QueryTypes } = require('sequelize');
const { Usuarios } = require('../models');
const sequelize = require('../database');


const usuarioController = {
    listarUsuarios: async (req, res) => {
        console.log('listarUsuarios...');
        const listaDeUsuarios = await Usuarios.findAll();
        res.json(listaDeUsuarios);
    },

    async cadastrarUsuario (req, res) {        
            const { nome, email, senha } = req.body;
           // const{ usuarioValidacao } = req.params;
            try {

                if (!nome || !email || !senha) {
                    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' })
                }
             const usuarioValidacao = await sequelize.query(
                "select * from usuario where email = ?",{
                    replacements: [email],
                    type: QueryTypes.SELECT
                })

        if (usuarioValidacao === 0) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' });
        }
            const novoUsuario = await Usuarios.create({
                nome,
                email,
                senha
             });

             res.status(201).json(novoUsuario);
        }
        catch (error) {
            return res.status(500).json('Ocorreu algum problema' + error);
        }
    },


    async atualizarUsuario (req, res) {
        const {id} = req.params;
        const {nome, email, senha} = req.body;

        if (!id) return res.status(400).json('id não enviado');

        const usuarioAtualizado = await Usuarios.update({
            nome,
            email,
            senha,
        },
        {
            where: {
                idusuario: id,
            }
        });

        res.status(200).json("Usuário atualizado com sucesso");
    },

    async deletarUsuario ( req, res) {
         try {
            const { idusuario } = req.params;
            await Usuarios.destroy ({ 
            where: { idusuario: idusuario
            }}); 
            res.status(200).json("Usuário deletado com sucesso");
        } catch (error) {
            return res.status(500).json('Ocorreu algum problema' + error);
        }
    },

    async autenticarUsuario ( req, res) {
        try {
           const { email, senha } = req.body;
           const user = await Usuarios.findOne ({ 
           where: { email: email,
                   senha: senha
           }}); 

           if (user) {
               req.session.login = email;
               return res.status(200).json('Logado com sucesso');
           }
           res.status(404).json("Usuário ou senha incorretos");

       } catch (error) {
           return res.status(500).json('Ocorreu algum problema' + error);
       }
   }
    
};

module.exports = usuarioController