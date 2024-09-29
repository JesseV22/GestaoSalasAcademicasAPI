const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Rota da raiz
router.get('/', (req, res) => {
    res.send('Bem-vindo à API de Salas de Aula!');
});

// GetAllSalasDeAula
router.get('/salasdeaula', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM salasdeaula WHERE removido = false");
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar salas' });
    }
});

// GetSalasDeAulaByID
router.get('/salasdeaula/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query("SELECT * FROM salasdeaula WHERE salasdeaulaid = ? AND removido = false", [id]);
        if (result[0].length === 0) {
            return res.status(404).json({ error: 'Sala não encontrada' });
        }
        res.json(result[0][0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar sala' });
    }
});

// InsertSalasDeAula
router.post('/salasdeaula', async (req, res) => {
    const { descricao, localizacao, capacidade } = req.body;
    try {
        await db.query("INSERT INTO salasdeaula (descricao, localizacao, capacidade, removido) VALUES (?, ?, ?, false)", 
            [descricao, localizacao, capacidade]);
        res.status(201).json({ message: 'Sala criada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar sala' });
    }
});

// UpdateSalasDeAula
router.put('/salasdeaula/:id', async (req, res) => {
    const { id } = req.params;
    const { descricao, localizacao, capacidade } = req.body;
    try {
        const result = await db.query("UPDATE salasdeaula SET descricao = ?, localizacao = ?, capacidade = ? WHERE salasdeaulaid = ?", 
            [descricao, localizacao, capacidade, id]);
        
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ error: 'Sala não encontrada' });
        }
        res.status(200).json({ message: 'Sala atualizada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar sala' });
    }
});

// DeleteSalasDeAula (Soft Delete)
router.delete('/salasdeaula/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query("UPDATE salasdeaula SET removido = true WHERE salasdeaulaid = ?", [id]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ error: 'Sala não encontrada' });
        }
        res.status(200).json({ message: 'Sala removida com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao remover sala' });
    }
});

module.exports = router;
