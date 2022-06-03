const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const categoriaController = require('../controllers/categoriaController');
const carteiraController = require('../controllers/carteiraController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const routes = express.Router();

routes.get('/', (req,res)=> {
    if (req.session.login){
        res.render('logado', {login: login});
    }
    else {
        res.render('index')
    }
});

//rotas do usuario
//routes.post('/athu', usuarioController.autenticarUsuario);
routes.get('/usuario', usuarioController.listarUsuarios);
routes.post('/usuario/cadastrar', usuarioController.cadastrarUsuario);
routes.put('/usuario/:id', usuarioController.atualizarUsuario);
routes.delete('/usuario/:idusuario', usuarioController.deletarUsuario);

//rotas para categoria
routes.get('/categoria', categoriaController.listarCategoria);
routes.post('/categoria/cadastrar', categoriaController.cadastrarCategoria);
routes.delete('/categoria/deletar/:idcategoria', categoriaController.deletarCategoria);

//rotas para transacao
routes.get('/carteira/listar/:id', carteiraController.listarTransacao);
routes.post('/carteira/cadastrar', carteiraController.cadastrarTransacao);
routes.put('/carteira/atualizar/:id', carteiraController.atualizarTransacao);
routes.delete('/carteira/deletar/:id', carteiraController.deletarTransacao);
routes.get('/carteira/totaldespesa/:id', carteiraController.obterExtratoDespesa);
routes.get('/carteira/totalreceita/:id', carteiraController.obterExtratoReceita);
routes.get('/carteira/totaldespesascompartilhada/:id/:idusuario_compartilha', carteiraController.obterExtratoDespesaCompartilhada);
routes.get('/carteira/saldos/:id', carteiraController.saldos);

module.exports = routes;
