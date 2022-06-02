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
routes.delete('/usuario/:id_usuario', usuarioController.deletarUsuario);

//rotas para categoria
routes.get('/categoria', categoriaController.listarCategoria);
routes.post('/categoria', categoriaController.cadastrarCategoria);
routes.put('/categoria/:id', categoriaController.atualizarCategoria);
//routes.delete('/categoria/:id', categoriaController.deletarCategoria);

//rotas para transacao
routes.get('/carteira/:id/listar', carteiraController.listarTransacao);
routes.post('/carteira', carteiraController.cadastrarTransacao);
routes.put('/carteira/:id/atualizar', carteiraController.atualizarTransacao);
routes.delete('/carteira/:id/deletar', carteiraController.deletarTransacao);
routes.get('/carteira/:id/totaldespesa', carteiraController.obterExtratoDespesa);
routes.get('/carteira/:id/totalreceita', carteiraController.obterExtratoReceita);
routes.get('/carteira/:id/:idusuario_compartilha/totaldespesascompartilhada', carteiraController.obterExtratoDespesaCompartilhada);
routes.get('/carteira/:id/saldos', carteiraController.saldos);

//rotas para filtros
routes.get('/carteira/saldomes', carteiraController.saldoMes);


module.exports = routes;