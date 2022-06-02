const db = require("../database");
const { DataTypes } = require("sequelize");
const Categoria = require("./Categoria")
const Usuarios = require("./Usuarios")

const Carteira = db.define("Carteira", {
    idcarteira: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descricao: {
        type: DataTypes.STRING
    },
    valor: {
        type: DataTypes.DOUBLE,
    },
    data: {
        type: DataTypes.DATE,
    },
    tipo: {
        type: DataTypes.STRING,
    },
    categoria_idcategoria: {
        type: DataTypes.INTEGER,
        references: {
            model: Categoria,
            key: "idcategoria"
        }
    },
    compartilha: {
        type: DataTypes.INTEGER,
    },
    idusuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuarios,
            key: "idusuario"
        }
    },
    status: {
        type: DataTypes.CHAR
    },
   
},
{
    tableName: "carteira"
});

module.exports = Carteira;