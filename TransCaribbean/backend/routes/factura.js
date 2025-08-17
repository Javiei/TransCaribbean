const express = require('express');
const router = express.Router();
const pool = require('../db');
const ExcelJS = require('exceljs');

// Obtener todas las facturas con información del cliente
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT f.id, f.cliente_id, f.total, f.fecha, f.detalle, 
              c.nombre AS cliente_nombre, c.rnc AS cliente_rnc
       FROM facturas f 
       LEFT JOIN clientes c ON f.cliente_id = c.id
       ORDER BY f.fecha DESC`
    );
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

// Descargar reporte Excel de facturas
router.get('/excel', async (req, res) => {
  console.log('>>> Generando Excel...'); // <-- Debug log
  try {
    const [rows] = await pool.query(
      `SELECT f.id, c.nombre AS cliente, f.total, f.fecha, f.detalle 
       FROM facturas f 
       LEFT JOIN clientes c ON f.cliente_id = c.id`
    );
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Facturas');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Cliente', key: 'cliente', width: 32 },
      { header: 'Total', key: 'total', width: 15 },
      { header: 'Fecha', key: 'fecha', width: 20 },
      { header: 'Detalle', key: 'detalle', width: 40 },
    ];

    rows.forEach(row => worksheet.addRow(row));

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=facturas.xlsx');
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error('Error al generar el Excel:', err); // <-- Debug error
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
