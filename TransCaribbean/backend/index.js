require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/facturas', require('./routes/factura'));
app.use('/api/clientes', require('./routes/cliente'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend corriendo en puerto ${PORT}`);
});