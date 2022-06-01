const Usuarios = require('./Usuarios');
const Categoria = require('./Categoria');
const Carteira = require('./Carteira');


Carteira.belongsTo(Categoria, {
   foreignkey: "categoria_idcategoria" 
});

Carteira.belongsTo(Usuarios,{
    foreignkey: "idusuario"
})

//Categoria.hasMany(Carteira);

module.exports = {
    Usuarios,
    Categoria,
    Carteira

}