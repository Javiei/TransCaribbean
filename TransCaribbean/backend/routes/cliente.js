const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nuevo cliente
router.post('/', async (req, res) => {
  const { nombre, telefono, email } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO clientes (nombre, telefono, email) VALUES (?, ?, ?)',
      [nombre, telefono, email]
    );
    res.json({ id: result.insertId, nombre, telefono, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;