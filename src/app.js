const express = require('express');
const routes = require('./routes');
const db = require('./database');

//const swaggerUi = require("swagger-ui-express");
//const YAML = require("yamljs");
//swaggerDocument = YAML.load("./swagger_aws.yaml");

//var cors = require("cors");
//const compression = require('compression')

//const dontSniffMimetype = require("dont-sniff-mimetype");

const app = express();

//db.hasConection();

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(routes);
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.listen(PORT, console.log(`Servidor rodando na porta ${PORT}` ));

app.listen(process.env.PORT, '0.0.0.0');
