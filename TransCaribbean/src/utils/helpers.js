export const getMonthName = (monthNumber = 0) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('es-ES', { month: 'long' });
};

export const processInvoiceData = (invoices = [], routes = []) => {
  const monthlySales = Array(12).fill(0);
  const clientSales = {};
  const routeSales = {};

  // Inicializar rutas con 0
  routes.forEach(route => {
    routeSales[route] = 0;
  });

  // Procesar facturas de la base de datos
  invoices.forEach(invoice => {
    // Extraer mes de la fecha (formato: YYYY-MM-DD)
    const month = new Date(invoice.fecha).getMonth();
    monthlySales[month] += parseFloat(invoice.total) || 0;

    // Extraer información del cliente del detalle
    // El detalle tiene formato: "NCF: XXX, Fulgón: XXX, Tipo: import/export"
    const detalle = invoice.detalle || '';
    const tipoMatch = detalle.match(/Tipo: (import|export)/i);
    const tipo = tipoMatch ? tipoMatch[1] : 'unknown';
    
    // Para clientes, usamos el nombre del cliente que viene del JOIN
    const clientKey = invoice.cliente_nombre || `Cliente ${invoice.cliente_id}`;
    if (clientSales[clientKey]) {
      clientSales[clientKey] += parseFloat(invoice.total) || 0;
    } else {
      clientSales[clientKey] = parseFloat(invoice.total) || 0;
    }

    // Para rutas, intentamos extraer del detalle o asignar por tipo
    // Por ahora asignamos por tipo de operación
    const routeKey = tipo === 'import' ? 'Importaciones' : 'Exportaciones';
    if (routeSales[routeKey]) {
      routeSales[routeKey] += parseFloat(invoice.total) || 0;
    } else {
      routeSales[routeKey] = parseFloat(invoice.total) || 0;
    }
  });

  const topClients = Object.entries(clientSales)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, sales]) => ({ name, sales }));

  const salesByRoute = Object.entries(routeSales)
    .map(([route, sales]) => ({ route, sales }));

  return { monthlySales, topClients, salesByRoute };
};