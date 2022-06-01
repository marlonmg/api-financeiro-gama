const db = require("../database");
const { DataTypes } = require("sequelize");
const Carteira = require("./Carteira");
const Usuarios = require("./Usuarios");

const CarteiraUsuario = db.define("CarteiraUsuario", {
    carteira_idcarteira: {
        type: DataTypes.INTEGER,
        references: {
            model: Carteira,
            key: "idcarteira"
        },
    },

    usuario_idusuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuarios,
            key: "idusuario"
        },
    },
},
{
    tableName: "carteira_usuario"
});

module.exports = CarteiraUsuario;