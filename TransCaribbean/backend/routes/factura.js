const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todas las facturas
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM facturas');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nueva factura
router.post('/', async (req, res) => {
  const { cliente_id, total, fecha, detalle } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO facturas (cliente_id, total, fecha, detalle) VALUES (?, ?, ?, ?)',
      [cliente_id, total, fecha, detalle]
    );
    res.json({ id: result.insertId, cliente_id, total, fecha, detalle });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;