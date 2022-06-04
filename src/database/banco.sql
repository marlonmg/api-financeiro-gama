-- mydb.categoria definition

CREATE TABLE `categoria` (
  `idcategoria` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) NOT NULL,
  PRIMARY KEY (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;


-- mydb.usuario definition

CREATE TABLE `usuario` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `senha` varchar(45) NOT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;


-- mydb.carteira definition

CREATE TABLE `carteira` (
  `idcarteira` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) NOT NULL,
  `valor` double NOT NULL,
  `data` date NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `categoria_idcategoria` int NOT NULL,
  `compartilha` int NOT NULL DEFAULT '0',
  `idusuario` int NOT NULL,
  `status` char(2) NOT NULL DEFAULT '1',
  `idusuario_compartilha` int DEFAULT NULL,
  PRIMARY KEY (`idcarteira`),
  KEY `fk_carteira_categoria_idx` (`categoria_idcategoria`),
  CONSTRAINT `fk_carteira_categoria` FOREIGN KEY (`categoria_idcategoria`) REFERENCES `categoria` (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
