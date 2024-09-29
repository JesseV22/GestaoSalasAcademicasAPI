const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db');  // Conexão com o banco de dados
const salasDeAulaRoutes = require('./routes/salasDeAula'); // Importando as rotas

const app = express();
app.use(bodyParser.json());  // Parseia o body das requisições

// Usando as rotas
app.use('/', salasDeAulaRoutes);

// Inicia o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
