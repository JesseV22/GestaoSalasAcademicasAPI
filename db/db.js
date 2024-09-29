const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',       // Usuário padrão do MySQL no XAMPP
    password: '',       // Senha padrão (vazia no XAMPP)
    database: 'aula'    // Nome do banco de dados
});

module.exports = pool.promise();

// Função para criar a tabela automaticamente
const createTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS salasdeaula (
            salasdeaulaid SERIAL PRIMARY KEY,
            descricao VARCHAR(255),
            localizacao VARCHAR(255),
            capacidade INTEGER,
            removido BOOLEAN DEFAULT false
        );
    `;
    try {
        await pool.query(query);
        console.log("Tabela 'salasdeaula' criada com sucesso!");
    } catch (err) {
        console.error("Erro ao criar a tabela: ", err);
    }
};

createTable();  // Chama a função assim que a conexão for estabelecida

module.exports = pool;
